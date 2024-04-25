export interface TrackMutation {
    album: string;
    title: string;
    duration?: string;
}

export interface ArtistMutation {
    name: string;
    image?: string | null;
    info?: string;
}

export interface AlbumMutation {
    artist: string;
    title: string;
    issueDate: Date;
    image?: string | null;
}

export interface UserFields {
    username: string;
    password: string;
    token: string;
}

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>;

export interface TrackHistoryMutation {
    user: string;
    track: string;
}