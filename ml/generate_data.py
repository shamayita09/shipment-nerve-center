
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
