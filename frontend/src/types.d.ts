export interface Artist {
    _id: string;
    name: string;
    info: string;
    image: string | null;
    isPublished: boolean;
    userId: string;
}

export interface Album {
    _id: string;
    title: string;
    image: string | null;
    issueDate: number;
    artist: Artist;
    isPublished: boolean;
    userId: string;
}

export interface Track {
    _id: string;
    number: number;
    title: string;
    duration: string;
    album: Album;
    isPublished: boolean;
    userId: string;
}

export interface User {
    _id: string;
    username: string;
    token: string;
    role: string;
}

export interface RegisterResponse {
    user: User;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface GlobalError {
    error: string;
}

export interface PlayTrack {
    trackId: string;
    token: string;
}

export interface PlayedTrack {
    id: string;
    artist: Artist;
    track: Track;
    playedAt: Date;
}

export interface AlbumMutation {
    title: string;
    image: string | null;
    issueDate: number;
    artist: string;
}

export interface ArtistMutation {
    name: string;
    info: string;
    image: string | null;
}

export interface TrackMutation {
    title: string;
    duration: string;
    album: string;
}