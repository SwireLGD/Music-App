import {Schema, model, Types} from 'mongoose';
import Album from "./Album";
import User from './User';

const TrackSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => Album.findById(value),
            message: 'Album does not exist!',
        }
    },
    duration: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User does not exist!',
        }
    },
}, {
    validateBeforeSave: false, 
});

TrackSchema.pre('save', async function (next) {
    if (!this.number && this.isNew) {
        const count = await Track.countDocuments({ album: this.album });
        this.number = count + 1;
    }
    next();
});

const Track = model('Track', TrackSchema);

export default Track;