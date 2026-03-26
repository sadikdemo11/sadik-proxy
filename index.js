const express = require('express');
const axios = require('axios');
const app = express();

const TARGET_HOST = "https://amadertv.top:8880";
const USER = "mozaher";
const PASS = "22446688";

app.get('/live', async (req, res) => {
    const streamId = req.query.id;
    if (!streamId) return res.status(400).send("ID missing");

    const finalUrl = `${TARGET_HOST}/live/${USER}/${PASS}/${streamId}.ts`;

    try {
        const response = await axios({
            method: 'get',
            url: finalUrl,
            responseType: 'stream',
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        res.setHeader('Content-Type', 'video/mp2t');
        response.data.pipe(res);
    } catch (e) {
        res.status(500).send("Error");
    }
});

app.listen(process.env.PORT || 3000);
