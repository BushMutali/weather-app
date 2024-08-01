// app/api/location/nearby-cities/route.js

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return new Response(
      JSON.stringify({ error: 'Latitude and longitude are required' }),
      { status: 400 }
    );
  }


  try {
    // Replace 'your_geonames_username' with your GeoNames username
    const response = await fetch(`http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lon}&username=${process.env.GEONAMES_USERNAME}`);
    const data = await response.json();

    if (data.geonames) {
      return new Response(JSON.stringify(data.geonames), { status: 200 });
    } else {
      return new Response(
        JSON.stringify({ error: 'No nearby cities found' }),
        { status: 404 }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch nearby cities' }),
      { status: 500 }
    );
  }
}
