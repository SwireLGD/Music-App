import mongoose, {Types} from "mongoose";
import Track from "./Track";
import User from "./User";
import Artist from "./Artist";
import Album from "./Album";

const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User does not exist!',
        }
    },
    track: {
        type: Schema.Types.ObjectId,
        ref: 'Track',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => Track.findById(value),
            message: 'Track does not exist!',
        }
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist'
    },
    datetime: {
        type: Date,
        required: true,
        default: Date.now
    }
});

TrackHistorySchema.pre('save', async function(next) {
    const track = await Track.findById(this.track).populate('album');
    if (track && track.album) {
        const album = await Album.findById(track.album);
        if (album && album.artist) {
            this.artist = album.artist;
        }
    }
    next();
});

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);

export default TrackHistory;