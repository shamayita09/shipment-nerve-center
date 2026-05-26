import os

os.makedirs('ml/data', exist_ok=True)
os.makedirs('ml/models', exist_ok=True)
os.makedirs('ml/api', exist_ok=True)

# Data generator
with open('ml/generate_data.py', 'w') as f:
    f.write("""
import pandas as pd
import numpy as np
import os

np.random.seed(42)
n = 2000  # number of synthetic shipments

ROUTES = [
    ('Shanghai', 'Mumbai', 18, 4),
    ('Guangzhou', 'Kolkata', 14, 3),
    ('Dubai', 'Mumbai', 7, 2),
    ('Singapore', 'Chennai', 10, 2),
    ('Rotterdam', 'Mumbai', 22, 5),
    ('Hamburg', 'Kolkata', 25, 6),
    ('Shanghai', 'Kolkata', 16, 3),
    ('Colombo', 'Mumbai', 5, 1),
]

CARRIERS = ['dhl', 'fedex', 'maersk', 'msc', 'ups', 'cma_cgm']

rows = []
for i in range(n):
    route = ROUTES[np.random.randint(len(ROUTES))]
    origin, destination, base_days, base_std = route
    carrier = CARRIERS[np.random.randint(len(CARRIERS))]
    month = np.random.randint(1, 13)
    day_of_week = np.random.randint(0, 7)
    port_congestion = np.random.uniform(0, 1)
    weather_severity = np.random.uniform(0, 1)
    is_holiday_season = 1 if month in [11, 12, 1] else 0
    is_monsoon = 1 if month in [6, 7, 8, 9] else 0

    # Delay logic based on real-world factors
    delay = 0
    delay += port_congestion * 4          # congestion adds up to 4 days
    delay += weather_severity * 2         # weather adds up to 2 days
    delay += is_holiday_season * 2        # holiday season adds 2 days
    delay += is_monsoon * 1.5             # monsoon adds 1.5 days
    delay += np.random.normal(0, base_std) # random variance

    # Carrier reliability factor
    carrier_factors = {
        'dhl': -0.5, 'fedex': -0.3, 'ups': -0.2,
        'maersk': 0.5, 'msc': 0.8, 'cma_cgm': 0.6
    }
    delay += carrier_factors.get(carrier, 0)
    delay = max(0, round(delay, 1))  # no negative delays

    rows.append({
        'origin': origin,
        'destination': destination,
        'carrier': carrier,
        'month': month,
        'day_of_week': day_of_week,
        'port_congestion': round(port_congestion, 3),
        'weather_severity': round(weather_severity, 3),
        'is_holiday_season': is_holiday_season,
        'is_monsoon': is_monsoon,
        'base_transit_days': base_days,
        'delay_days': delay
    })

df = pd.DataFrame(rows)
os.makedirs('ml/data', exist_ok=True)
df.to_csv('ml/data/shipments.csv', index=False)
print('Generated', len(df), 'synthetic shipments')
print(df.describe())
print('Average delay:', round(df.delay_days.mean(), 2), 'days')
""")
print('Done: generate_data.py')

# Training script
with open('ml/train.py', 'w') as f:
    f.write("""
import pandas as pd
import numpy as np
import pickle
import os
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error, r2_score
import xgboost as xgb
import shap

print('Loading data...')
df = pd.read_csv('ml/data/shipments.csv')

# Encode categorical columns
le_origin = LabelEncoder()
le_destination = LabelEncoder()
le_carrier = LabelEncoder()

df['origin_enc'] = le_origin.fit_transform(df['origin'])
df['destination_enc'] = le_destination.fit_transform(df['destination'])
df['carrier_enc'] = le_carrier.fit_transform(df['carrier'])

# Features the model learns from
FEATURES = [
    'origin_enc', 'destination_enc', 'carrier_enc',
    'month', 'day_of_week', 'port_congestion',
    'weather_severity', 'is_holiday_season',
    'is_monsoon', 'base_transit_days'
]

X = df[FEATURES]
y = df['delay_days']

# Split into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print('Training XGBoost model...')
model = xgb.XGBRegressor(
    n_estimators=200,
    max_depth=6,
    learning_rate=0.1,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42
)
model.fit(X_train, y_train)

# Evaluate
preds = model.predict(X_test)
mae = mean_absolute_error(y_test, preds)
r2 = r2_score(y_test, preds)
print('Mean Absolute Error:', round(mae, 2), 'days')
print('R2 Score:', round(r2, 3))

# SHAP explainer - explains WHY a prediction was made
print('Building SHAP explainer...')
explainer = shap.TreeExplainer(model)

# Save everything
os.makedirs('ml/models', exist_ok=True)
with open('ml/models/model.pkl', 'wb') as f:
    pickle.dump(model, f)
with open('ml/models/encoders.pkl', 'wb') as f:
    pickle.dump({
        'origin': le_origin,
        'destination': le_destination,
        'carrier': le_carrier,
        'features': FEATURES
    }, f)
with open('ml/models/explainer.pkl', 'wb') as f:
    pickle.dump(explainer, f)

print('Model saved to ml/models/')
print('Training complete!')
""")
print('Done: train.py')

# Prediction API
with open('ml/api/predict.py', 'w') as f:
    f.write("""
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
        if abs(val) > 0.1:
            direction = 'adding' if val > 0 else 'reducing'
            reasons.append({
                'factor': FEATURE_LABELS.get(feat, feat),
                'impact_days': round(val, 1),
                'direction': direction
            })

    return jsonify({
        'predicted_delay_days': predicted_delay,
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
""")
print('Done: predict.py')
print('All ML files written!')