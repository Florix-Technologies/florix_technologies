import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, message, service, serviceDetails } = body;

        // Validate required fields
        if (!name || !email || !service) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Set SendGrid API Key
        const apiKey = process.env.SENDGRID_API_KEY;
        if (!apiKey) {
            console.error('SENDGRID_API_KEY is missing');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }
        sgMail.setApiKey(apiKey);

        const fromEmail = process.env.CONTACT_FROM;
        const toEmail = process.env.CONTACT_TO;

        if (!fromEmail || !toEmail) {
            console.error('CONTACT_FROM or CONTACT_TO is missing');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        // Format Service Details for the email
        let detailsHtml = '';
        if (serviceDetails) {
            detailsHtml = `
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px;">
            <h3 style="color: #333; margin-top: 0;">${service} Details:</h3>
            <ul style="list-style-type: none; padding: 0;">
                ${Object.entries(serviceDetails).map(([key, value]) => `
                    <li style="margin-bottom: 5px;">
                        <strong>${key.replace(/([A-Z])/g, ' $1').trim()}:</strong> ${value}
                    </li>
                `).join('')}
            </ul>
        </div>
        `;
        }

        const msg = {
            to: toEmail,
            from: fromEmail,
            subject: `New Quote Request: ${service} from ${name}`,
            text: `
        New Quote Request from Florix Technologies Website
        
        Service: ${service}
        
        Contact Details:
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        
        Service Details:
        ${JSON.stringify(serviceDetails, null, 2)}
        
        Additional Message:
        ${message}
      `,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Quote Request</h2>
          
          <div style="margin-bottom: 20px;">
            <p><strong>Service Requested:</strong> <span style="font-size: 1.1em; color: #2563eb;">${service}</span></p>
          </div>

          <div style="background-color: #f0fdf4; padding: 15px; border-radius: 5px; border-left: 4px solid #16a34a; margin-bottom: 20px;">
            <h3 style="color: #166534; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone}</p>
          </div>

          ${detailsHtml}

          <div style="margin-top: 20px;">
            <h3>Additional Message:</h3>
            <p style="background-color: #f3f4f6; padding: 15px; border-radius: 5px;">${message || 'No additional message provided.'}</p>
          </div>
          
          <p style="font-size: 12px; color: #666; margin-top: 30px; text-align: center;">
            This email was sent from the Florix Technologies website contact form.
          </p>
        </div>
      `,
        };

        await sgMail.send(msg);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('SendGrid Error:', error);
        if (error.response) {
            console.error(error.response.body);
        }
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}
