-- src/db/schema.sql

-- Shipments table: one row per shipment you're tracking
CREATE TABLE IF NOT EXISTS shipments (
  id            SERIAL PRIMARY KEY,
  tracking_number VARCHAR(100) NOT NULL,
  carrier         VARCHAR(50)  NOT NULL,   -- 'dhl', 'fedex', 'maersk'
  description     TEXT,                    -- e.g. "Electronics batch - Invoice #442"
  origin          VARCHAR(100),            -- "Shanghai, CN"
  destination     VARCHAR(100),            -- "Mumbai, IN"
  status          VARCHAR(50) DEFAULT 'pending',  -- our normalized status
  eta             TIMESTAMP,               -- expected arrival
  predicted_delay_days INTEGER DEFAULT 0, -- ML model fills this later
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);

-- Events table: every status update is stored as an event (never deleted)
-- This gives you a full history and feeds the ML model later
CREATE TABLE IF NOT EXISTS shipment_events (
  id            SERIAL PRIMARY KEY,
  shipment_id   INTEGER REFERENCES shipments(id) ON DELETE CASCADE,
  status        VARCHAR(50)  NOT NULL,   -- normalized status
  raw_status    VARCHAR(200),            -- exactly what the carrier said
  location      VARCHAR(200),
  carrier_timestamp TIMESTAMP,
  created_at    TIMESTAMP DEFAULT NOW()
);

-- Alerts table: tracks what notifications have been sent
CREATE TABLE IF NOT EXISTS alerts (
  id          SERIAL PRIMARY KEY,
  shipment_id INTEGER REFERENCES shipments(id) ON DELETE CASCADE,
  type        VARCHAR(50),   -- 'delay', 'delivered', 'customs_hold'
  channel     VARCHAR(20),   -- 'email', 'whatsapp'
  sent_at     TIMESTAMP DEFAULT NOW()
);