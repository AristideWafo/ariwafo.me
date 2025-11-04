import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    
    // Validation côté serveur
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Validation format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Construction de l'email
    const emailContent = `
Nouveau message depuis votre portfolio ariwafo.me

👤 De: ${body.name}
📧 Email: ${body.email}
📋 Sujet: ${body.subject}

💬 Message:
${body.message}

---
📅 Reçu le: ${new Date().toLocaleString('fr-FR')}
🌐 Envoyé depuis: ariwafo.me
    `.trim();

    // Log pour debug (en développement)
    console.log('=== NOUVEAU MESSAGE CONTACT ===');
    console.log(`À: wafoaristide@gmail.com`);
    console.log(`De: ${body.name} <${body.email}>`);
    console.log(`Sujet: ${body.subject}`);
    console.log('===========================');
    console.log(emailContent);
    console.log('===========================');
    
    // TODO: Intégrer un service d'email (Resend, Nodemailer, SendGrid)
    // Pour l'instant, l'email est logué et vous pouvez voir les détails
    
    // Simulation d'envoi réussi
    return NextResponse.json(
      { 
        success: true, 
        message: 'Message reçu ! Je vous répondrai dans les 24-48h.'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur lors du traitement du message:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}