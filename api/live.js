module.exports = async (req, res) => {
    const { id } = req.query;
    if (!id) return res.status(400).send("ID missing");

    // আপনার অরিজিনাল সার্ভার লিঙ্ক
    const targetUrl = `https://amadertv.top:8880/live/mozaher/22446688/${id}.ts`;

    // সরাসরি রিডাইরেক্ট করা (এতে লোডিং স্পিড সুপার ফাস্ট হবে)
    res.writeHead(302, {
        'Location': targetUrl
    });
    res.end();
};
