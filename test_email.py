import subprocess
import os

script = """
require('dotenv').config();
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);
resend.emails.send({
  from: 'onboarding@resend.dev',
  to: process.env.ALERT_EMAIL,
  subject: 'Test from Shipment Tracker',
  html: '<p>Email alerts working</p>'
}).then(r => console.log('Success:', JSON.stringify(r))).catch(e => console.log('Error:', e.message));
"""

with open('test_email.js', 'w') as f:
    f.write(script)

print('Written test_email.js')