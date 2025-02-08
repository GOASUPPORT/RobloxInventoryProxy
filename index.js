
const express = require('express');
const cors = require('cors');  // This is required for CORS support

const app = express();
app.use(cors());  // Allow requests from any origin
app.use(express.json());

app.get('/inventory', async (req, res) => {
    try {
        const { assetTypeId, userId, cursor, itemsPerPage } = req.query;
        const url = `https://inventory.roblox.com/v1/users/${userId}/assets/collectibles?assetType=${assetTypeId}&cursor=${cursor || ''}&limit=${itemsPerPage || 100}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        res.json(data);  // Send back data to Roblox
    } catch (error) {
        res.status(500).json({ error: 'Proxy failed' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Proxy running on port ${PORT}`));
