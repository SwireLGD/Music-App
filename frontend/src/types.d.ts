export interface Artist {
    _id: string;
    name: string;
    image: string | null;
}

export interface Album {
    _id: string;
    title: string;
    image: string | null;
    issueDate: number;
    artist: Artist;
}

export interface Track {
    _id: string;
    number: number;
    title: string;
    duration: string;
    album: Album;
}

export interface RegisterMutation {
    username: string;
    password: string;
}

export interface User {
    _id: string;
    username: string;
    token: string;
}

export interface RegisterResponse {
    user: User;
    message: string;
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