import axios from 'axios';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const visitorCity = searchParams.get('visitorCity');

  if (!visitorCity) {
    return new Response(
      JSON.stringify({ error: 'City name is required' }),
      { status: 400 }
    );
  }

  const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;
  const url = `https://api.unsplash.com/search/photos`;

  try {
    const response = await axios.get(url, {
      params: {
        query: `${visitorCity} city`,
        client_id: unsplashAccessKey,
        per_page: 1,
      },
    });

    if (response.data.results.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No images found for the specified city' }),
        { status: 404 }
      );
    }

    // Construct the image URL with desired parameters
    const rawImageUrl = response.data.results[0].urls.raw;
    const imageUrl = `${rawImageUrl}&w=3048&dpr=2&fit=max&auto=format&q=100`;

    return new Response(
      JSON.stringify({ image: imageUrl }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch image from Unsplash' }),
      { status: 500 }
    );
  }
}
