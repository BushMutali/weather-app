import City from "@models/City";
import { connectToDB } from "@utils/database";

// get
export const GET = async (request, {params}) => {
    try {
        await connectToDB();
        const cities = await City.find({creator: params.id}).populate('creator')
        return new Response(JSON.stringify(cities), {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to fetch all cities", {
            status: 500
        })
    }
}

