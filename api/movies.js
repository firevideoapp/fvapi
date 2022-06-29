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
                    // if (data[i].movieLang === reqQueryVal) {
                        
                    // }
                    songRes.push({
                        dateAdded: data[i].dateAdded,
                        provider: data[i].provider,
                        tmdb: data[i].tmdb,
                        adult: data[i].adult,
                        contentId: data[i].contentId,
                        movieName: data[i].movieName,
                        movieLang: data[i].movieLang,
                        movieImage: data[i].movieImage,
                        movieArt: data[i].movieArt,
                        movieGenre: data[i].movieGenre,
                        keywords: data[i].keywords,
                        movieStory: data[i].movieStory,
                        movieUrl: data[i].movieUrl,
                        drmLicense: data[i].drmLicense,
                        sdServer: data[i].sdServer,
                        hdServer: data[i].hdServer,
                        fhdServer: data[i].fhdServer
                    })
                }
            }

            res.json(songRes)
        })
        .catch(function (error) {
            res.json({ result: "false", "error": error })
        })
}