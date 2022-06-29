const axios = require("axios").default;

// module.exports = async (req, res) => {
//     var reqQuery = req.query.query;
//     res.setHeader("Access-Control-Allow-Origin", "*")
//     res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate")
//     res.setHeader("Made-By", "FireVideo")

//     axios.get('https://raw.githubusercontent.com/firevideoapp/fvdb/main/DB/MOVIES.json')
//         .then(async function (response) {
//             var data = JSON.parse(JSON.stringify(response.data))
//             var songRes = []
//             // for (i = 0; i < data.length; i++) {
                
//             // }

//             songRes.push({
//                 id : data[0].contentId,
//                 name: data[0].movieName
//             })
//             res.JSON(songRes)
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }

console.log("Hello World");
