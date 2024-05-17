import mongoose, {HydratedDocument} from 'mongoose';
import {UserFields, UserMethods, UserModel} from "../types";
import bcrypt from 'bcrypt';
import {randomUUID} from "crypto";

const Schema = mongoose.Schema;

interface IUser extends UserFields, mongoose.Document {}

const UserSchema = new Schema<UserFields, UserModel, UserMethods>({

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function(this: HydratedDocument<IUser>, email: string): Promise<boolean> {
                if (!this.isModified('email')) return true;

                const user = await User.findOne({ email });
                return !user;
            },
            message: 'This user is already registered'
        }
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin']
    },
    displayName: {
        type: String,
        required: true
    },
    googleID: String,
    avatar: String || null,
});

UserSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function() {
    this.token = randomUUID();
};

const SALT_WORK_FACTOR = 10;

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;

    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});

const User = mongoose.model<UserFields, UserModel>('User', UserSchema);

export default User;