import express from "express";
import Track from "../models/Track";
import {TrackMutation} from "../types";
import auth, { RequestWithUser } from "../middleware/auth";
import permit from "../middleware/permit";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res) => {
    try {
        const album = typeof req.query.album === 'string' ? req.query.album : undefined;

        let tracks;

        const sorting = {number: 1 as -1 | 1};

        if (album) {
            tracks = await Track.find({ album }).populate('album').sort(sorting);
        } else {
            tracks = await Track.find().populate('album').sort(sorting);
        }

        return res.send(tracks);
    } catch (e) {
        return res.sendStatus(500);
    }
});

tracksRouter.post('/', auth, async (req, res) => {
    const trackData: TrackMutation = {
        title: req.body.title,
        album: req.body.album,
        duration: req.body.duration,
        number: req.body.number,
        isPublished: false,
    };

    const track = new Track(trackData);

    try {
        await track.save();
        return res.send(track);
    } catch (e) {
        return res.status(400).send(e);
    }
});

tracksRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: 'Authentication is required' });
    }
    try {
        const result = await Track.deleteOne({ _id: req.params.id});
        if (result.deletedCount === 0) {
            return res.status(404).send({ error: 'Track not found or unauthorized to delete the item' });
        }
        return res.status(204).send();
    } catch (e) {
        return next(e);
    }
});

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);
        if (!track) {
            return res.status(404).send({ error: 'Track not found' });
        }

        track.isPublished = !track.isPublished;

        await track.save();

        return res.send(track);
    } catch (e) {
        return res.status(500).send(e);
    }
});

export default tracksRouter;