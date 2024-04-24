import express from "express";
import User from "../models/User";
import Track from "../models/Track";
import TrackHistory from "../models/TrackHistory";
import {TrackHistoryMutation} from "../types";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res) => {
    const token = req.get('Authorization');
    if (!token) {
        return res.status(401).send('No token present');
    }

    const user = await User.findOne({token: token});

    if (!user) {
        return res.status(401).send('Invalid token');
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
        user: user._id,
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

export default trackHistoryRouter;