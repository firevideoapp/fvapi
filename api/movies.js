const song = require("./song");

const axios = require("axios").default;

module.exports = async (req, res) => {
    var reqQueryCategory = req.query.category;
    var reqQueryVal = req.query.value;
    var reqQueryAdult = Boolean(req.query.adult);
    var reqQueryNoOfItems = req.query.n;
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate")
    res.setHeader("Made-By", "FireVideo")

    axios({
        method: 'get',
        url: `https://raw.githubusercontent.com/firevideoapp/fvdb/main/DB/MOVIES.json`
    })
        .then(async function (response) {
            var data = JSON.parse(JSON.stringify(response.data))
            var songRes = []
            var loadNoOfItems = data.length;

            if (data.length >= reqQueryAdult) {
                loadNoOfItems = reqQueryAdult;
            }

            for (i = 0; i < loadNoOfItems; i++) {
                if (reqQueryCategory === 'lg') {
                    if (data[i].movieLang.toLowerCase().includes(reqQueryVal)) {
                        addMovie(songRes, data[i], reqQueryAdult)
                    }
                } else if (reqQueryCategory === 'gen') {
                    if (data[i].movieGenre.toLowerCase().includes(reqQueryVal)) {
                        addMovie(songRes, data[i], reqQueryAdult)
                    }
                }
            }

            res.json(songRes)
        })
        .catch(function (error) {
            res.json({ result: "false", "error": error })
        })
}

function addMovie(songRes, d, adult) {
    if (Boolean(d.adult) === adult) {
        songRes.push({
            dateAdded: d.dateAdded,
            provider: d.provider,
            tmdb: d.tmdb,
            adult: d.adult,
            contentId: d.contentId,
            movieName: d.movieName,
            movieLang: d.movieLang,
            movieImage: d.movieImage,
            movieArt: d.movieArt,
            movieGenre: d.movieGenre,
            keywords: d.keywords,
            movieStory: d.movieStory,
            movieUrl: d.movieUrl,
            drmLicense: d.drmLicense,
            sdServer: d.sdServer,
            hdServer: d.hdServer,
            fhdServer: d.fhdServer
        })
    }
}