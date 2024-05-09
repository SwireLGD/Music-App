import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import User from "./models/User";


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

    const [artist1, artist2, artist3] = await Artist.create({
        name: 'Within Temptation',
        image: '/public/fixtures/withinTemptation.jpg',
        info: 'Dutch symphonic metal band',
        isPublished: true
    },  {
        name: 'DROELOE',
        image: '/public/fixtures/droeloe.jpg',
        info: 'Dutch electronic music project by Vincent Rooijers',
        isPublished: true
    }, {
        name: 'Ado',
        image: '/public/fixtures/ado.jpg',
        info: 'A Japanese singer. In 2020, at the age of 17, she made her debut with the digital single titled Usseewa',
        isPublished: false
    }
);


    const [album1, album2, album3, album4, album5] = await Album.create({
        title: 'Wireless',
        artist: artist1._id,
        issueDate: '1688083200',
        image: '/public/fixtures/wireless.jpg',
        isPublished: true
    } , {
        title: 'Bleed Out',
        artist: artist1._id,
        issueDate: '1697760000',
        image: '/public/fixtures/bleedOut.jpg',
        isPublished: true
    }, {
        title: 'A promise is made',
        artist: artist2._id,
        issueDate: '1570752000',
        image: '/public/fixtures/aPromiseIsMade.jpg',
        isPublished: true
    }, {
        title: 'A matter of perspective',
        artist: artist2._id,
        issueDate: '1605225600',
        image: '/public/fixtures/aMatterOfPerspective.jpg',
        isPublished: true
    }, {
        title: 'Kyogen',
        artist: artist3._id,
        issueDate: '1643155200',
        image: '/public/fixtures/kyogen.jpg',
        isPublished: false
    });

    await Track.create({
        title: 'Wireless',
        album: album1._id,
        duration: '4:41',
        number: 1,
        isPublished: true
    }, {
        title: 'Do not Pray For Me',
        album: album1._id,
        duration: '3:41',
        number: 2,
        isPublished: true
    }, {
        title: 'Shed My Skin',
        album: album1._id,
        duration: '4:30',
        number: 3,
        isPublished: true
    }, {
        title: 'The Purge',
        album: album1._id,
        duration: '4:16',
        number: 4,
        isPublished: true
    }, {
        title: 'Entertain You',
        album: album1._id,
        duration: '3:31',
        number: 5,
        isPublished: true
    }, {
        title: 'We Go To War',
        album: album2._id,
        duration: '4:19',
        number: 1,
        isPublished: true
    }, {
        title: 'Ritual',
        album: album2._id,
        duration: '3:37',
        number: 2,
        isPublished: true
    }, {
        title: 'Unbroken',
        album: album2._id,
        duration: '5:08',
        number: 3,
        isPublished: true
    }, {
        title: 'Cyanide Love',
        album: album2._id,
        duration: '4:04',
        number: 4,
        isPublished: true
    }, {
        title: 'Worth Dying For',
        album: album2._id,
        duration: '4:53',
        number: 5,
        isPublished: true
    }, {
        title: 'OATH',
        album: album3._id,
        duration: '3:28',
        number: 1,
        isPublished: true
    }, {
        title: 'Virtual Friends',
        album: album3._id,
        duration: '3:37',
        number: 2,
        isPublished: true
    }, {
        title: 'Casual Trouble',
        album: album3._id,
        duration: '4:00',
        number: 3,
        isPublished: true
    }, {
        title: 'Broken Bricks',
        album: album3._id,
        duration: '3:09',
        number: 4,
        isPublished: true
    }, {
        title: 'Komorebi',
        album: album3._id,
        duration: '2:00',
        number: 5,
        isPublished: true
    }, {
        title: 'Panorama',
        album: album4._id,
        duration: '3:49',
        number: 1,
        isPublished: true
    }, {
        title: 'Sunburn - Reimagined',
        album: album4._id,
        duration: '4L07',
        number: 2,
        isPublished: true
    }, {
        title: 'Open Blinds',
        album: album4._id,
        duration: '4:15',
        number: 3,
        isPublished: true
    }, {
        title: 'Looking Back - Reimagined',
        album: album4._id,
        duration: '2:51',
        number: 4,
        isPublished: true
    }, {
        title: 'Roadside Flowers',
        album: album4._id,
        duration: '3:49',
        number: 5,
        isPublished: true
    }, {
        title: 'Fireworks',
        album: album5._id,
        duration: '3:32',
        number: 1,
        isPublished: false
    }, {
        title: 'Gira Gira',
        album: album5._id,
        duration: '4:36',
        number: 2,
        isPublished: false
    }, {
        title: 'Ashura-chan',
        album: album5._id,
        duration: '3:15',
        number: 3,
        isPublished: false
    });

    await User.create({
        username: 'Swire',
        password: '123qwerty',
        token: crypto.randomUUID(),
        role: 'user'
    }, {
        username: 'Liliweiss',
        password: '321qwerty',
        token: crypto.randomUUID(),
        role: 'admin'
    });

    await db.close();
};

run().catch(console.error);