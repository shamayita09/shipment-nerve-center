
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
