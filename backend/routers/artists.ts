import express from "express";
import Artist from "../models/Artist";
import {ArtistMutation} from "../types";
import {imagesUpload} from "../multer";
import auth, { RequestWithUser } from "../middleware/auth";
import permit from "../middleware/permit";

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res) => {
    try {
        const artists = await Artist.find();
        return res.send(artists);
    } catch (e) {
        return res.sendStatus(500);
    }
});

artistsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res) => {
    if (!req.user) {
        return res.status(401).send({ error: 'User must be authenticated.' });
    }
    const artistData: ArtistMutation = {
        name: req.body.name,
        image: req.file ? req.file.filename : null,
        info: req.body.info,
        isPublished: false,
        user: req.user?._id
    };

    const artist = new Artist(artistData);

    try {
        await artist.save();
        return res.send(artist);
    } catch (e) {
        return res.status(400).send(e);
    }
});

artistsRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: 'Authentication is required' });
    }

    const artist = await Artist.findById(req.params.id);

    try {
        const result = await Artist.deleteOne({ _id: req.params.id});

        if (result.deletedCount === 0) {
            return res.status(404).send({ error: 'Artist not found or unauthorized to delete the item' });
        }

        if (artist?.user.toString() !== req.user._id.toString()) {
            return res.status(403).send({ error: 'You do not have permission to delete this artist' });
        }

        if (artist.isPublished) {
            return res.status(403).send({ error: 'Cannot delete a published artist' });
        }

        return res.status(204).send();
    } catch (e) {
        return next(e);
    }
});

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) {
            return res.status(404).send({ error: 'Artist not found' });
        }

        artist.isPublished = !artist.isPublished;

        await artist.save();

        return res.send(artist);
    } catch (e) {
        return res.status(500).send(e);
    }
});

export default artistsRouter;