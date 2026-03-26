const axios = require('axios');

module.exports = async (req, res) => {
    const { id } = req.query;
    if (!id) return res.status(400).send("ID missing");

    const targetUrl = `https://amadertv.top:8880/live/mozaher/22446688/${id}.ts`;

    try {
        const response = await axios({
            method: 'get',
            url: targetUrl,
            responseType: 'stream',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                'Accept': '*/*',
                'Connection': 'keep-alive'
            },
            timeout: 10000 // ১০ সেকেন্ডের মধ্যে রেসপন্স না পেলে এরর দিবে
        });

        // ভিডিও ডাটা পাঠানোর জন্য সঠিক হেডার
        res.setHeader('Content-Type', 'video/mp2t');
        response.data.pipe(res);

    } catch (error) {
        console.error(error);
        res.status(500).send("Stream Error: Server not responding");
    }
};
