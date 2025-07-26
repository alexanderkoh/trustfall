import { NextRequest, NextResponse } from 'next/server';

// Environment variables for security
const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
const PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;
const LUMINA_AUTOMATION_ID = process.env.BEEHIIV_LUMINA_AUTOMATION_ID;
const SHADOW_AUTOMATION_ID = process.env.BEEHIIV_SHADOW_AUTOMATION_ID;

export async function POST(request: NextRequest) {
  try {
    const { email, faction } = await request.json();

    if (!email || !faction) {
      return NextResponse.json(
        { error: 'Email and faction are required' },
        { status: 400 }
      );
    }

    // Validate environment variables
    if (!BEEHIIV_API_KEY || !PUBLICATION_ID || !LUMINA_AUTOMATION_ID || !SHADOW_AUTOMATION_ID) {
      console.error('Missing required environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Determine which automation ID to use based on faction
    const automationId = faction === 'lumina' ? LUMINA_AUTOMATION_ID : SHADOW_AUTOMATION_ID;
    
    console.log(`Processing ${faction} faction subscription for:`, email);

    // Step 1: Create subscription
    console.log('Creating subscription for:', email);
    const subscriptionResponse = await fetch(`https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}/subscriptions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.trim(),
        reactivate_existing: false,
        send_welcome_email: true,
        utm_source: 'trustfall-app',
        utm_medium: 'faction-selection',
        utm_campaign: faction === 'lumina' ? 'lumina-collective' : 'shadow-syndicate'
      }),
    });

    if (!subscriptionResponse.ok) {
      const errorData = await subscriptionResponse.json();
      console.error('Subscription creation failed:', errorData);
      return NextResponse.json(
        { error: 'Failed to create subscription', details: errorData },
        { status: subscriptionResponse.status }
      );
    }

    const subscriptionData = await subscriptionResponse.json();
    console.log('Subscription created:', subscriptionData);

    // Step 2: Add subscription to faction-specific automation journey
    console.log(`Adding to ${faction} automation journey (${automationId})...`);
    const automationResponse = await fetch(`https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}/automations/${automationId}/journeys`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscription_id: subscriptionData.data.id,
        double_opt_override: 'single_opt_in'
      }),
    });

    let automationData = null;
    if (!automationResponse.ok) {
      const errorData = await automationResponse.json();
      console.error('Automation enrollment failed:', errorData);
      // Don't fail the whole request - subscription was successful
      console.warn('Subscription created but automation enrollment failed');
    } else {
      automationData = await automationResponse.json();
      console.log('Added to automation:', automationData);
    }

    return NextResponse.json({
      success: true,
      subscription: subscriptionData,
      automation: automationData,
      message: 'Successfully joined the network!'
    });

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 