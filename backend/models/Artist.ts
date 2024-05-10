import {Schema, Types, model} from 'mongoose';
import User from './User';

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: String || null,
    info: String,
    isPublished: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User does not exist!',
        }
    }
});

const Artist = model('Artist', ArtistSchema);

export default Artist;