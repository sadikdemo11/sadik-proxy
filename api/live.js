const axios = require('axios');

module.exports = async (req, res) => {
    const { id } = req.query;
    if (!id) return res.status(400).send("ID missing");

    // আপনার অরিজিনাল সার্ভার লিঙ্ক
    const targetUrl = `https://amadertv.top:8880/live/mozaher/22446688/${id}.ts`;

    try {
        const response = await axios({
            method: 'get',
            url: targetUrl,
            responseType: 'stream',
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });

        res.setHeader('Content-Type', 'video/mp2t');
        response.data.pipe(res);
    } catch (error) {
        res.status(500).send("Stream Error");
    }
};
  
