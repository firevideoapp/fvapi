const axios = require("axios").default;

module.exports = async (req, res) => {
    var reqQueryCategory = req.query.category;
    var reqQueryVal = req.query.value;
    var reqQueryAdult = Boolean(req.query.adult);
    var reqQueryNoOfItems = Number(req.query.n);
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate")
    res.setHeader("Made-By", "FireVideo")

    axios({
        method: 'get',
        url: `https://raw.githubusercontent.com/firevideoapp/fvdb/main/DB/MOVIES.json`
    })
        .then(async function (response) {
            var data = JSON.parse(JSON.stringify(response.data))
            var tempMovieRes = []
            var songRes = []

            for (i = 0; i < data.length; i++) {
                tempMovieRes.push({
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
                tempMovieRes = shuffle(tempMovieRes)
                if (reqQueryCategory === 'lg') {
                    if (tempMovieRes[i].movieLang.toLowerCase().includes(reqQueryVal)) {
                        addMovie(songRes, data[i], reqQueryAdult, data.length, reqQueryNoOfItems)
                    }
                } else if (reqQueryCategory === 'gen') {
                    if (data[i].movieGenre.toLowerCase().includes(reqQueryVal)) {
                        addMovie(songRes, data[i], reqQueryAdult, data.length, reqQueryNoOfItems)
                    }
                }
            }

            res.json(songRes)
        })
        .catch(function (error) {
            res.json({ result: "false", "error": error })
        })
}

function shuffle (arr) {
    var j, x, index;
    for (index = arr.length - 1; index > 0; index--) {
        j = Math.floor(Math.random() * (index + 1));
        x = arr[index];
        arr[index] = arr[j];
        arr[j] = x;
    }
    return arr;
}

function addMovie(songRes, d, adult, totalItems, noOfItems) {
    if (noOfItems <= totalItems && songRes.length < noOfItems) {
        if (Boolean(d.adult) === true) {
            if (adult === true) {
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
        } else {
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
}