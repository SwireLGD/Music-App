import {Schema, model, Types} from 'mongoose';
import Album from "./Album";

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
    }
});

TrackSchema.pre('save', async function(next) {
    if (this.isNew) {
        const count = await Track.countDocuments({ album: this.album });
        this.number = count + 1;
    }
    next();
});

const Track = model('Track', TrackSchema);

export default Track;