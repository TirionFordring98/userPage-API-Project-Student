const express = require('express');
const cors = require('cors');
const faker = require('faker'); // Import the faker library

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

app.get('/api/random-users', (req, res) => {
    const randomUsers = [];

    // Generate 14 random users
    for (let i = 0; i < 14; i++) {
        const user = {
            fullName: faker.name.findName(),
        };
        randomUsers.push(user);
    }

    res.json(randomUsers);
});
app.get('/api/random-profile-picture', (req, res) => {
    try {
        const profilePictures = [
            "https://www.giantbomb.com/a/uploads/square_medium/15/152870/2910647-6798788475-wei-w.jpg",
            "https://arpeggi-prod-public.s3.us-west-2.amazonaws.com/voice-models/images/8j2DH-pD8TUvFMFUfwLVl.jpg",
            "https://wallpapers.com/images/hd/caption-tirion-fordring-champion-of-light-kkfxlwd9z2yahgve.jpg",
            "https://wallpapers.com/images/hd/league-of-legends-rengar-deviantart-8ww0ih81n8hyoptj.jpg",
            "https://lolwp.com/wp-content/uploads/Mordekaiser_Pentakill.jpg",
            "https://www.hiveworkshop.com/media/muradin-bronzebeard.112278/full?d=1481360795",
           
        ];

        const randomProfilePicture = profilePictures[Math.floor(Math.random() * profilePictures.length)];

        // Redirect to the image URL
        res.redirect(randomProfilePicture);
    } catch (error) {
        console.error('Error serving random profile picture:', error);
        res.status(500).json({ error: error.message });
    }
});
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
