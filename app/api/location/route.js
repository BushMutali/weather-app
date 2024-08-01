import { NextResponse } from 'next/server';

export async function GET(request) {
  let ip = request.headers.get('x-forwarded-for') || request.ip || '8.8.8.8'; 
  if (ip.startsWith('::ffff:')) {
    ip = ip.split(':').pop(); // Extract IPv4 part
  }
  
  // If running locally, use an external service to get the real IP
  if (ip === '127.0.0.1') {
    const externalIpRes = await fetch('https://api.ipify.org?format=json');
    const externalIpData = await externalIpRes.json();
    ip = externalIpData.ip;
  }

  const locationResponse = await fetch(`https://ipinfo.io/${ip}/json?token=${process.env.IPINFO_TOKEN}`);
  const locationData = await locationResponse.json();
  return NextResponse.json(locationData);
}
