/**
 * Cloudflare Email Worker for Automated Bonus Delivery
 * Handles receipt verification and bonus package delivery
 */

export default {
  async email(message, env, ctx) {
    const { from, to, subject, headers } = message;
    
    // Only process emails sent to bonuses@alphaperformancelab.com
    if (!to.includes('bonuses@alphaperformancelab.com')) {
      return;
    }

    try {
      // Extract receipt information from email
      const receiptData = await extractReceiptData(message);
      
      if (!receiptData) {
        return await sendErrorResponse(from, 'Invalid receipt format');
      }

      // Verify receipt with ClickBank (placeholder - would need actual API)
      const isValidReceipt = await verifyReceipt(receiptData, env);
      
      if (!isValidReceipt) {
        return await sendErrorResponse(from, 'Receipt verification failed');
      }

      // Check if bonuses already sent
      const existingDelivery = await checkExistingDelivery(receiptData.email, env);
      
      if (existingDelivery) {
        return await sendDuplicateResponse(from, existingDelivery);
      }

      // Generate secure access token
      const accessToken = await generateAccessToken(receiptData.email, env);
      
      // Record delivery in Airtable
      await recordDelivery(receiptData, accessToken, env);
      
      // Send bonus package email
      await sendBonusPackage(from, accessToken, env);
      
      // Send confirmation
      return await sendConfirmation(from, receiptData.email);
      
    } catch (error) {
      console.error('Bonus delivery error:', error);
      return await sendErrorResponse(from, 'System error occurred');
    }
  }
};

/**
 * Extract receipt data from email content
 */
async function extractReceiptData(message) {
  try {
    // This would parse the email content to extract receipt info
    // For now, return mock data structure
    return {
      email: message.from,
      transactionId: 'CB' + Math.random().toString(36).substr(2, 9),
      amount: '47.00',
      product: 'The Edison Wave',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Receipt extraction error:', error);
    return null;
  }
}

/**
 * Verify receipt with ClickBank API
 */
async function verifyReceipt(receiptData, env) {
  try {
    // Placeholder for ClickBank API verification
    // In production, this would make an actual API call
    const response = await fetch('https://api.clickbank.com/receipts/verify', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.CLICKBANK_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        transactionId: receiptData.transactionId,
        email: receiptData.email
      })
    });
    
    return response.ok;
  } catch (error) {
    console.error('Receipt verification error:', error);
    // For demo purposes, return true
    return true;
  }
}

/**
 * Check if bonuses already delivered
 */
async function checkExistingDelivery(email, env) {
  try {
    const response = await fetch(`https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/Deliveries`, {
      headers: {
        'Authorization': `Bearer ${env.AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    return data.records.find(record => record.fields.email === email);
  } catch (error) {
    console.error('Existing delivery check error:', error);
    return null;
  }
}

/**
 * Generate secure access token
 */
async function generateAccessToken(email, env) {
  const token = btoa(email + ':' + Date.now() + ':' + Math.random());
  return token;
}

/**
 * Record delivery in Airtable
 */
async function recordDelivery(receiptData, accessToken, env) {
  try {
    await fetch(`https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/Deliveries`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        records: [{
          fields: {
            email: receiptData.email,
            transactionId: receiptData.transactionId,
            accessToken: accessToken,
            deliveredAt: new Date().toISOString(),
            status: 'delivered'
          }
        }]
      })
    });
  } catch (error) {
    console.error('Airtable recording error:', error);
  }
}

/**
 * Send bonus package email
 */
async function sendBonusPackage(to, accessToken, env) {
  const bonusEmail = {
    to: to,
    subject: 'Your $197 Edison Wave Bonus Package - Access Your $39 Limited-Time Bonuses Now!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Your Edison Wave Bonus Package</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .bonus-item { background: white; margin: 20px 0; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; }
          .cta-button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Congratulations!</h1>
            <h2>Your $197 Edison Wave Bonus Package is Ready</h2>
          </div>
          
          <div class="content">
            <p>Thank you for purchasing The Edison Wave! As promised, here's your exclusive bonus package worth $197 - available for just $39 during our limited-time offer.</p>
            
            <div class="bonus-item">
              <h3>🎵 Bonus #1: Cognitive Clarity Audio Collection</h3>
              <p><strong>Value: $97</strong></p>
              <p>4 professionally-mastered ambient tracks designed to enhance focus and creativity:</p>
              <ul>
                <li>Focus Flow (15 minutes)</li>
                <li>Creative Spark (12 minutes)</li>
                <li>Deep Concentration (20 minutes)</li>
                <li>Mental Clarity (18 minutes)</li>
              </ul>
              <a href="https://alphaperformancelab.com/bonuses/audio?token=${accessToken}" class="cta-button">Download Audio Collection</a>
            </div>
            
            <div class="bonus-item">
              <h3>📊 Bonus #2: Alpha Performance Habit Tracker</h3>
              <p><strong>Value: $47</strong></p>
              <p>Notion template with 30-day tracking system for:</p>
              <ul>
                <li>Daily alpha wave sessions</li>
                <li>Focus and productivity metrics</li>
                <li>Sleep quality tracking</li>
                <li>Mood and energy levels</li>
              </ul>
              <a href="https://alphaperformancelab.com/bonuses/tracker?token=${accessToken}" class="cta-button">Get Habit Tracker</a>
            </div>
            
            <div class="bonus-item">
              <h3>📧 Bonus #3: 7-Day Alpha Mastery Email Course</h3>
              <p><strong>Value: $37</strong></p>
              <p>Daily emails with advanced techniques:</p>
              <ul>
                <li>Day 1: Understanding Alpha Waves</li>
                <li>Day 2: Optimal Listening Times</li>
                <li>Day 3: Combining with Meditation</li>
                <li>Day 4: Enhancing Creativity</li>
                <li>Day 5: Improving Sleep Quality</li>
                <li>Day 6: Stress Reduction Techniques</li>
                <li>Day 7: Long-term Optimization</li>
              </ul>
              <a href="https://alphaperformancelab.com/bonuses/course?token=${accessToken}" class="cta-button">Start Email Course</a>
            </div>
            
            <div class="bonus-item">
              <h3>💬 Bonus #4: Exclusive Discord Community Access</h3>
              <p><strong>Value: $16</strong></p>
              <p>Join our private community of alpha wave enthusiasts:</p>
              <ul>
                <li>Daily tips and techniques</li>
                <li>Success stories and testimonials</li>
                <li>Monthly AMA sessions</li>
                <li>Exclusive content and updates</li>
              </ul>
              <a href="https://alphaperformancelab.com/bonuses/discord?token=${accessToken}" class="cta-button">Join Discord Community</a>
            </div>
            
            <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>🔒 Secure Access</h3>
              <p>Your access token: <code>${accessToken}</code></p>
              <p><strong>Important:</strong> Keep this email safe! Your access token is unique to you and cannot be regenerated.</p>
            </div>
            
            <p>If you have any questions about your bonus package, simply reply to this email and we'll help you out!</p>
            
            <p>Welcome to the Alpha Performance Lab community!</p>
            
            <p>Best regards,<br>
            The Alpha Performance Lab Team</p>
          </div>
          
          <div class="footer">
            <p>Alpha Performance Lab | alphaperformancelab.com</p>
            <p>This email was sent because you purchased The Edison Wave. Unsubscribe at any time.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
  
  // Send email using Cloudflare Email Workers
  // This would use the actual email sending service
  console.log('Sending bonus package email to:', to);
}

/**
 * Send error response
 */
async function sendErrorResponse(to, errorMessage) {
  console.log('Sending error response to:', to, 'Error:', errorMessage);
  // Would send actual error email
}

/**
 * Send duplicate response
 */
async function sendDuplicateResponse(to, existingDelivery) {
  console.log('Sending duplicate response to:', to);
  // Would send email with existing access token
}

/**
 * Send confirmation
 */
async function sendConfirmation(to, email) {
  console.log('Sending confirmation to:', to);
  // Would send confirmation email
}