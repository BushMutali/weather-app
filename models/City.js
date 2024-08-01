import { Schema, model, models } from "mongoose";

const CitySchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    city: {
        type: String,
        required: [true, "Prompt is required!"]
    },
    favorite: {
        type: Boolean,
        default: false, 
    }
})

const City = models.City || model('City', CitySchema);
export default City;