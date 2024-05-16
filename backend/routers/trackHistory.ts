import express from "express";
import Track from "../models/Track";
import TrackHistory from "../models/TrackHistory";
import {TrackHistoryMutation} from "../types";
import auth, {RequestWithUser} from "../middleware/auth";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', auth, async (req: RequestWithUser, res) => {
    if (!req.user) {
        return res.status(401).send('Unauthorized: No user found');
    }
    const track = req.body.track;

    if (!track) {
        return res.status(400).send('Track ID is required');
    }

    const doesTrackExist = await Track.findById(track);

    if (!doesTrackExist) {
        return res.status(404).send('Track does not exist');
    }

    const trackHistoryData: TrackHistoryMutation = {
        user: req.user._id,
        track: track,
    };

    const trackHistory = new TrackHistory(trackHistoryData);

    try {
        await trackHistory.save();
        return res.send(trackHistory);
    } catch (e) {
        return res.status(400).send(e);
    }
});

trackHistoryRouter.get('/', auth, async (req: RequestWithUser, res) => {
    if (!req.user) {
        return res.status(401).send('Authentication required');
    }

    try {
        const history = await TrackHistory.find({ user: req.user._id }).sort({ datetime: -1 }).populate('track artist');
        res.json(history.map(h => ({
            id: h._id,
            track: h.track,
            artist: h.artist,
            playedAt: h.datetime
        })));
    } catch (e) {
        res.status(500).send(e);
    }
});

export default trackHistoryRouter;