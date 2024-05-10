import {Schema, model, Types} from 'mongoose';
import Artist from "./Artist";
import User from './User';

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => Artist.findById(value),
            message: 'Artist does not exist!',
        }
    },
    issueDate: {
        type: Number,
        required: true
    },
    image: String || null,
    isPublished: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User does not exist!',
        }
    }
});

const Album = model('Album', AlbumSchema);

export default Album;