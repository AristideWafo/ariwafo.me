import { NextRequest, NextResponse } from 'next/server';

interface MetadataResponse {
  title: string;
  description: string;
  image: string;
  url: string;
  platform: string;
}

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
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: 'URL parameter is required' },
      { status: 400 }
    );
  }

  try {
    // Fetch de la page web
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MetadataBot/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    
    // Extraire les métadonnées avec des regex
    const getMetaContent = (property: string): string => {
      // OpenGraph tags
      const ogRegex = new RegExp(`<meta[^>]*property=["']og:${property}["'][^>]*content=["']([^"']*?)["']`, 'i');
      const ogMatch = html.match(ogRegex);
      if (ogMatch) return ogMatch[1];
      
      // Twitter tags
      const twitterRegex = new RegExp(`<meta[^>]*name=["']twitter:${property}["'][^>]*content=["']([^"']*?)["']`, 'i');
      const twitterMatch = html.match(twitterRegex);
      if (twitterMatch) return twitterMatch[1];
      
      // Standard meta tags
      if (property === 'title') {
        const titleRegex = /<title[^>]*>([^<]*?)<\/title>/i;
        const titleMatch = html.match(titleRegex);
        if (titleMatch) return titleMatch[1];
      }
      
      if (property === 'description') {
        const descRegex = /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*?)["']/i;
        const descMatch = html.match(descRegex);
        if (descMatch) return descMatch[1];
      }
      
      return '';
    };

    const title = getMetaContent('title') || 'Article sans titre';
    const description = getMetaContent('description') || 'Aucune description disponible';
    const image = getMetaContent('image') || '';
    
    // Déterminer la plateforme à partir de l'URL
    const getPlatform = (url: string): string => {
      if (url.includes('medium.com')) return 'Medium';
      if (url.includes('dev.to')) return 'Dev.to';
      if (url.includes('linkedin.com')) return 'LinkedIn';
      if (url.includes('hashnode.com')) return 'Hashnode';
      if (url.includes('substack.com')) return 'Substack';
      return 'Article';
    };

    const platform = getPlatform(url);

    const metadata: MetadataResponse = {
      title: title.trim(),
      description: description.trim(),
      image: image || '',
      url,
      platform,
    };

    return NextResponse.json(metadata);

  } catch (error) {
    console.error('Error fetching metadata:', error);
    
    // Fallback en cas d'erreur
    const getPlatform = (url: string): string => {
      if (url.includes('medium.com')) return 'Medium';
      if (url.includes('dev.to')) return 'Dev.to';
      if (url.includes('linkedin.com')) return 'LinkedIn';
      if (url.includes('hashnode.com')) return 'Hashnode';
      if (url.includes('substack.com')) return 'Substack';
      return 'Article';
    };

    const fallbackMetadata: MetadataResponse = {
      title: `Article sur ${getPlatform(url)}`,
      description: 'Impossible de récupérer la description de cet article.',
      image: '',
      url,
      platform: getPlatform(url),
    };

    return NextResponse.json(fallbackMetadata);
  }
}