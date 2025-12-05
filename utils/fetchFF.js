const axios = require("axios");

const BASE_API = "https://ff-info.vercel.app/account?uid="; // এটা পরে তুই নিজের host দিয়ে replace করতে পার

async function fetchFFPlayer(uid) {
    try {
        const res = await axios.get(`${BASE_API}${uid}&region=BD`, { timeout: 10000 });
        if (!res.data) throw new Error("No data returned");

        const basic = res.data.basicInfo || {};
        const profile = res.data.profileInfo || {};
        const clan = res.data.clanBasicInfo || { clanName: "None" };
        const totalMatches = basic.totalMatches || 0;
        const wins = basic.wins || 0;
        const winRate = totalMatches > 0 ? ((wins / totalMatches) * 100).toFixed(2) : "0.00";

        return {
            nickname: basic.nickname || "Unknown",
            uid: basic.accountId || uid,
            level: basic.level || 0,
            rank: basic.rank || "Unranked",
            rankPoints: basic.rankPoints || 0,
            totalKills: basic.totalKills || 0,
            totalMatches,
            wins,
            winRate,
            headshotRate: basic.headshotRate || 0,
            clan: clan.clanName,
            profile
        };
    } catch (err) {
        console.log("Error fetching FF data:", err.message);
        throw err;
    }
}

module.exports = { fetchFFPlayer };
