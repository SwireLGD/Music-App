    import express from "express";
    import Track from "../models/Track";
    import {TrackMutation} from "../types";
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

    tracksRouter.post('/', async (req, res) => {
        const trackData: TrackMutation = {
            title: req.body.title,
            album: req.body.album,
            duration: req.body.duration,
        };

        const track = new Track(trackData);

        try {
            await track.save();
            return res.send(track);
        } catch (e) {
            return res.status(400).send(e);
        }
    });

    export default tracksRouter;