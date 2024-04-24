import express from "express";
import Artist from "../models/Artist";
import {ArtistMutation} from "../types";
import {imagesUpload} from "../multer";

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res) => {
    try {
        const artists = await Artist.find();
        return res.send(artists);
    } catch (e) {
        return res.sendStatus(500);
    }
});

artistsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
    const artistData: ArtistMutation = {
        name: req.body.name,
        image: req.file ? req.file.filename : null,
        info: req.body.info
    };

    const artist = new Artist(artistData);

    try {
        await artist.save();
        return res.send(artist);
    } catch (e) {
        return res.status(400).send(e);
    }
});

export default artistsRouter;