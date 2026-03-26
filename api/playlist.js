const axios = require('axios');

module.exports = async (req, res) => {
    // আপনার অরিজিনাল মেইল লিস্ট লিঙ্ক
    const M3U_URL = "https://amadertv.top:8880/get.php?username=mozaher&password=22446688&type=m3u_plus&output=m3u8";
    // আপনার ভেরসেল প্রক্সি বেইজ লিঙ্ক
    const PROXY_BASE = "https://sadik-proxy.vercel.app/api/live?id=";

    try {
        const response = await axios.get(M3U_URL);
        const data = response.data;
        const lines = data.split('\n');
        let newPlaylist = "#EXTM3U\n";

        lines.forEach(line => {
            if (line.includes("#EXTINF:")) {
                newPlaylist += line + "\n";
            } else if (line.startsWith("http")) {
                // লিঙ্ক থেকে শুধু আইডি (যেমন: 101) বের করা
                const id = line.trim().split('/').pop().split('.')[0];
                // আইডি-কে আপনার প্রক্সির সাথে জুড়ে দেওয়া
                newPlaylist += PROXY_BASE + id + "\n";
            }
        });

        res.setHeader('Content-Type', 'application/x-mpegurl');
        res.setHeader('Content-Disposition', 'attachment; filename="sadik_pro.m3u"');
        res.send(newPlaylist);
    } catch (error) {
        res.status(500).send("Error converting playlist");
    }
};
  
