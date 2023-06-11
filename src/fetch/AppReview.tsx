import {proxyURL} from "../app/Pico4Apps";


type SteamAppQuerySummary = {
    total_positive: number;
    total_negative: number;
};

type SteamAppReview = {
    query_summary: SteamAppQuerySummary;
};

const steamReviewUrl = 'https://store.steampowered.com/appreviews/'; // 2151960?json=1

export async function getAppReview(appid: number) {
    if (appid !== 0) {
        const review: SteamAppReview = (await (await fetch(proxyURL + steamReviewUrl + appid + "?json=1")).json());
        return (calcRating(review.query_summary.total_positive, review.query_summary.total_negative)).toFixed(1);
    }
}

function calcRating(positiveVotes: number, negativeVotes: number) {
    const totalVotes = positiveVotes + negativeVotes;
    const average = positiveVotes / totalVotes;
    const score = average - (average - 0.5) * Math.pow(2, -Math.log10(totalVotes + 1));

    return score * 10;
}