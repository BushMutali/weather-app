import City from "@models/City";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const city = await City.findById(params.id).populate('creator')
        if (!city) return new Response("city not found", { status: 404 });

        return new Response(JSON.stringify(city), {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to fetch all propmts", {
            status: 500
        })
    }
}

export const PATCH = async (request, { params }) => {
    const { fav } = await request.json();

    try {
        await connectToDB();

        const existingCity = await City.findById(params.id);
        if (!existingCity) return new Response("City not found", { status: 404 });
        existingCity.fav = fav;
        await existingCity.save();

        return new Response(JSON.stringify(existingCity), { status: 200 });
    } catch (error) {
        console.error("Failed to update the city", error);
        return new Response("Failed to update the city", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        await City.findByIdAndDelete(params.id)
        return new Response("City deleted successfully", { status: 200 })
    } catch (error) {
        return new Response("Failed to delete city", { status: 500 })
    }
}