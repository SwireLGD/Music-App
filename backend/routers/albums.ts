import express from "express";
import Album from "../models/Album";
import {AlbumMutation} from "../types";
import {imagesUpload} from "../multer";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res) => {
    try {
        const artist = typeof req.query.artist === 'string' ? req.query.artist : undefined;

        let albums;

        if (artist) {
            albums = await Album.find({ artist }).populate('artist');
        } else {
            albums = await Album.find().populate('artist');
        }

        return res.send(albums);
    } catch (e) {
        return res.sendStatus(500);
    }
});

albumsRouter.get('/:id', async (req, res) => {
    try {
        const album = await Album.findById(req.params.id).populate('artist');
        if (!album) {
            return res.status(404).send({ message: 'Album not found' });
        }
        return res.send(album);
    } catch (e) {
        return res.sendStatus(500);
    }
});


albumsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
    const albumData: AlbumMutation = {
        title: req.body.title,
        artist: req.body.artist,
        issueDate: req.body.issueDate,
        image: req.file ? req.file.filename : null,
    };

    const album = new Album(albumData);

    try {
        await album.save();
        return res.send(album);
    } catch (e) {
        return res.status(400).send(e);
    }
});

export default albumsRouter;
