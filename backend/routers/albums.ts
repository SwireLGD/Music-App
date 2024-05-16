import express from "express";
import Album from "../models/Album";
import {AlbumMutation} from "../types";
import {imagesUpload} from "../multer";
import auth, { RequestWithUser } from "../middleware/auth";
import permit from "../middleware/permit";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res) => {
    try {
        const artist = typeof req.query.artist === 'string' ? req.query.artist : undefined;

        let albums;

        const sorting = {issueDate: -1 as -1 | 1};

        if (artist) {
            albums = await Album.find({ artist }).populate('artist').sort(sorting);
        } else {
            albums = await Album.find().populate('artist').sort(sorting);
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

albumsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res) => {
    if (!req.user) {
        return res.status(401).send({ error: 'User must be authenticated.' });
    }
    const albumData: AlbumMutation = {
        title: req.body.title,
        artist: req.body.artist,
        issueDate: req.body.issueDate,
        image: req.file ? req.file.filename : null,
        isPublished: false,
        userId: req.user?._id
    };

    const album = new Album(albumData);

    try {
        await album.save();
        return res.send(album);
    } catch (e) {
        return res.status(400).send(e);
    }
});

albumsRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: 'Authentication is required' });
    }

    const album = await Album.findById(req.params.id);

    if (!album) {
        return res.status(404).send({ error: 'Album not found' });
    }

    try {
        if (req.user.role.includes('admin') || (album.userId?.toString() === req.user._id.toString() && !album.isPublished)) {
            const result = await Album.deleteOne({ _id: req.params.id});
    
            if (result.deletedCount === 0) {
                return res.status(404).send({ error: 'Album not found or unauthorized to delete the item' });
            }
    
            return res.status(204).send();
        } else {
            return res.status(403).send({ error: 'You do not have permission to delete this album' });
        }
    } catch (e) {
        return next(e);
    }
});

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        if (!album) {
            return res.status(404).send({ error: 'Album not found' });
        }

        album.isPublished = !album.isPublished;

        await album.save();

        return res.send(album);
    } catch (e) {
        return res.status(500).send(e);
    }
});

export default albumsRouter;