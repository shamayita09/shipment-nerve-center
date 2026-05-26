
from flask import Flask, request, jsonify
import pickle
import numpy as np
import pandas as pd
from datetime import datetime
import os

app = Flask(__name__)

# Load model and encoders
BASE = os.path.join(os.path.dirname(__file__), '..', 'models')

with open(os.path.join(BASE, 'model.pkl'), 'rb') as f:
    model = pickle.load(f)
with open(os.path.join(BASE, 'encoders.pkl'), 'rb') as f:
    encoders = pickle.load(f)
with open(os.path.join(BASE, 'explainer.pkl'), 'rb') as f:
    explainer = pickle.load(f)

FEATURE_LABELS = {
    'origin_enc': 'Origin port',
    'destination_enc': 'Destination port',
    'carrier_enc': 'Carrier reliability',
    'month': 'Time of year',
    'day_of_week': 'Day of week',
    'port_congestion': 'Port congestion',
    'weather_severity': 'Weather conditions',
    'is_holiday_season': 'Holiday season',
    'is_monsoon': 'Monsoon season',
    'base_transit_days': 'Route length'
}

def encode_safe(encoder, value):
    classes = list(encoder.classes_)
    if value in classes:
        return encoder.transform([value])[0]
    return 0  # default for unknown values

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    origin = data.get('origin', 'Shanghai')
    destination = data.get('destination', 'Mumbai')
    carrier = data.get('carrier', 'maersk')
    port_congestion = float(data.get('port_congestion', 0.3))
    weather_severity = float(data.get('weather_severity', 0.2))
    base_transit_days = int(data.get('base_transit_days', 14))

    now = datetime.now()
    month = now.month
    day_of_week = now.weekday()
    is_holiday_season = 1 if month in [11, 12, 1] else 0
    is_monsoon = 1 if month in [6, 7, 8, 9] else 0

    features = {
        'origin_enc': encode_safe(encoders['origin'], origin),
        'destination_enc': encode_safe(encoders['destination'], destination),
        'carrier_enc': encode_safe(encoders['carrier'], carrier),
        'month': month,
        'day_of_week': day_of_week,
        'port_congestion': port_congestion,
        'weather_severity': weather_severity,
        'is_holiday_season': is_holiday_season,
        'is_monsoon': is_monsoon,
        'base_transit_days': base_transit_days
    }

    X = pd.DataFrame([features])[encoders['features']]
    predicted_delay = float(model.predict(X)[0])
    predicted_delay = max(0, round(predicted_delay, 1))

    # SHAP explanation - what caused this prediction
    shap_values = explainer.shap_values(X)
    shap_dict = dict(zip(encoders['features'], shap_values[0]))

    # Get top 3 reasons
    sorted_shap = sorted(shap_dict.items(), key=lambda x: abs(x[1]), reverse=True)
    reasons = []
    for feat, val in sorted_shap[:3]:
        if abs(float(val)) > 0.1:
            direction = 'adding' if float(val) > 0 else 'reducing'
            reasons.append({
                'factor': FEATURE_LABELS.get(feat, feat),
                'impact_days': round(float(val), 1),
                'direction': direction
            })

    return jsonify({
        'predicted_delay_days': float(predicted_delay),
        'confidence': 'high' if predicted_delay > 2 else 'medium' if predicted_delay > 0.5 else 'low',
        'reasons': reasons,
        'inputs': {
            'origin': origin,
            'destination': destination,
            'carrier': carrier,
            'month': month,
            'port_congestion': port_congestion
        }
    })

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    print('ML Prediction API running on http://localhost:5001')
    app.run(port=5001, debug=False)
