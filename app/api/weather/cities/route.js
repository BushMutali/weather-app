import { NextResponse } from 'next/server';

export async function GET(request) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = new URL(request.url);
  const cityParam = url.searchParams.get('cities');

  if (!cityParam) {
    return NextResponse.json({ error: 'No cities provided' }, { status: 400 });
  }

  const cities = cityParam.split(',');

  const cityData = await Promise.all(
    cities.map(async (city) => {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${apiKey}`);
      const data = await res.json();
      return { city: city.trim(), data };
    })
  );

  return NextResponse.json(cityData);
}
