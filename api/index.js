module.exports = async (req, res) => {
    var query = req.query.query
    if (query == '123') {
        res.json({
            status: "Running",
            documentation: "https://github.com/cachecleanerjeet/JiosaavnAPI/wiki",
            made_by: "https://github.com/cachecleanerjeet"
        })
    } else {
        res.json({
            status: "Authentication Failed",
            made_by: "https://github.com/cachecleanerjeet"
        })
    }
}