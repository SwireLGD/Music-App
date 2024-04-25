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