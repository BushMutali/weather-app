import City from "@models/City";
import { connectToDB } from "@utils/database";
import { validateCity } from "@utils/validateCity";


export const POST = async (req) => {
    const { userId, city } = await req.json();

    const isValidCity = await validateCity(city);
    if (!isValidCity) {
        return new Response("Invalid city name", {
            status: 400,
        });
    }


    try {
        await connectToDB();
        const newCity = new City({
            creator: userId,
            city,
            fav: 'no',
        })

        await newCity.save();
        return new Response(JSON.stringify(newCity), {
            status: 201
        })
    } catch (error) {
        return new Response("Failed to add new city", { staus: 500 })
    }
}   

