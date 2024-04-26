import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";


const run = async () => {

    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('artists');
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
    } catch (e) {
        console.error('Error ', e);
    }

    const [artist1, artist2] = await Artist.create({
        name: 'Within Temptation',
        image: '/public/fixtures/withinTemptation.jpg',
        info: 'Dutch symphonic metal band'
    }, {
        name: 'DROELOE',
        image: '/public/fixtures/droeloe.jpg',
        info: 'Dutch electronic music project by Vincent Rooijers'
    });


    const [album1, album2, album3, album4] = await Album.create({
        title: 'Wireless',
        artist: artist1._id,
        issueDate: '1688083200',
        image: '/public/fixtures/wireless.jpg'
    } , {
        title: 'Bleed Out',
        artist: artist1._id,
        issueDate: '1697760000',
        image: '/public/fixtures/bleedOut.jpg'
        }, {
        title: 'A promise is made',
        artist: artist2._id,
        issueDate: '1570752000',
        image: '/public/fixtures/aPromiseIsMade.jpg'
        }, {
        title: 'A matter of perspective',
        artist: artist2._id,
        issueDate: '1605225600',
        image: '/public/fixtures/aMatterOfPerspective.jpg'
    });

    await Track.create({
        title: 'Wireless',
        album: album1._id,
        duration: '4:41',
        number: 1
    }, {
        title: 'Do not Pray For Me',
        album: album1._id,
        duration: '3:41',
        number: 2
    }, {
        title: 'Shed My Skin',
        album: album1._id,
        duration: '4:30',
        number: 3
    }, {
        title: 'The Purge',
        album: album1._id,
        duration: '4:16',
        number: 4
    }, {
        title: 'Entertain You',
        album: album1._id,
        duration: '3:31',
        number: 5
    }, {
        title: 'We Go To War',
        album: album2._id,
        duration: '4:19',
        number: 1
    }, {
        title: 'Ritual',
        album: album2._id,
        duration: '3:37',
        number: 2
    }, {
        title: 'Unbroken',
        album: album2._id,
        duration: '5:08',
        number: 3
    }, {
        title: 'Cyanide Love',
        album: album2._id,
        duration: '4:04',
        number: 4
    }, {
        title: 'Worth Dying For',
        album: album2._id,
        duration: '4:53',
        number: 5
    }, {
        title: 'OATH',
        album: album3._id,
        duration: '3:28',
        number: 1
    }, {
        title: 'Virtual Friends',
        album: album3._id,
        duration: '3:37',
        number: 2
    }, {
        title: 'Casual Trouble',
        album: album3._id,
        duration: '4:00',
        number: 3
    }, {
        title: 'Broken Bricks',
        album: album3._id,
        duration: '3:09',
        number: 4
    }, {
        title: 'Komorebi',
        album: album3._id,
        duration: '2:00',
        number: 5
    }, {
        title: 'Panorama',
        album: album4._id,
        duration: '3:49',
        number: 1
    }, {
        title: 'Sunburn - Reimagined',
        album: album4._id,
        duration: '4L07',
        number: 2
    }, {
        title: 'Open Blinds',
        album: album4._id,
        duration: '4:15',
        number: 3
    }, {
        title: 'Looking Back - Reimagined',
        album: album4._id,
        duration: '2:51',
        number: 4
    }, {
        title: 'Roadside Flowers',
        album: album4._id,
        duration: '3:49',
        number: 5
    });

    await db.close();
};

run().catch(console.error);