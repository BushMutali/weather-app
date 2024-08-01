
import axios from 'axios';

export const validateCity = async (city) => {
    const apiKey = process.env.OPENWEATHER_API_KEY; 
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await axios.get(url);
        return response.status === 200;
    } catch (error) {
        return false;
    }
};
