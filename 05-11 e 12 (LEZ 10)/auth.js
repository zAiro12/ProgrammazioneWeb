const apikey = "123456"

function auth(req, res, next){
    if (req.query.apikey != apikey){
        res.status(401)
        return res.json({message: "Invalid API key"})
    }
    next()
}

module.exports = { auth }