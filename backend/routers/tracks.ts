    import express from "express";
    import Track from "../models/Track";
    import {TrackMutation} from "../types";
    import Album from "../models/Album";

    const tracksRouter = express.Router();

    tracksRouter.get('/', async (req, res) => {
        try {
            const album = typeof req.query.album === 'string' ? req.query.album : undefined;

            let tracks;

            if (album) {
                tracks = await Track.find({ album }).populate('album');
            } else {
                tracks = await Track.find().populate('album');
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