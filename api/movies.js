const song = require("./song");

const axios = require("axios").default;

module.exports = async (req, res) => {
    var reqQueryCategory = req.query.category;
    var reqQueryVal = req.query.value;
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
            
            for (i = 0; i < data.length; i++) {
                if (reqQueryCategory === 'lg') {
                    if (reqQueryVal === data[i].movieLang.toLowerCase()) {
                        addMovie(data[i])
                    }
                }
            }

            res.json(songRes)
        })
        .catch(function (error) {
            res.json({ result: "false", "error": error })
        })
}

function addMovie(data) {
    songRes.push({
        dateAdded: data.dateAdded,
        provider: data.provider,
        tmdb: data.tmdb,
        adult: data.adult,
        contentId: data.contentId,
        movieName: data.movieName,
        movieLang: data.movieLang,
        movieImage: data.movieImage,
        movieArt: data.movieArt,
        movieGenre: data.movieGenre,
        keywords: data.keywords,
        movieStory: data.movieStory,
        movieUrl: data.movieUrl,
        drmLicense: data.drmLicense,
        sdServer: data.sdServer,
        hdServer: data.hdServer,
        fhdServer: data.fhdServer
    })
}