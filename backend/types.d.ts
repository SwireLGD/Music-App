import {Types} from "mongoose";

export interface TrackMutation {
    album: string;
    title: string;
    duration?: string;
    isPublished: boolean;
    userId: Types.ObjectId;
}

export interface ArtistMutation {
    name: string;
    image?: string | null;
    info?: string;
    isPublished: boolean;
    userId: Types.ObjectId;
}

export interface AlbumMutation {
    artist: string;
    title: string;
    issueDate: number;
    image?: string | null;
    isPublished: boolean;
    userId: Types.ObjectId;
}

export interface UserFields {
    email: string;
    password: string;
    token: string;
    role: string;
    displayName: string;
    googleID?: string;
    avatar?: string | null;
}

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>;

export interface TrackHistoryMutation {
    user: Types.ObjectId;
    track: string;
}