import {Types} from "mongoose";

export interface TrackMutation {
    album: string;
    title: string;
    duration?: string;
    isPublished: boolean;
}

export interface ArtistMutation {
    name: string;
    image?: string | null;
    info?: string;
    isPublished: boolean;
}

export interface AlbumMutation {
    artist: string;
    title: string;
    issueDate: number;
    image?: string | null;
    isPublished: boolean;
}

export interface UserFields {
    username: string;
    password: string;
    token: string;
    role: string;
    isPublished: boolean;
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