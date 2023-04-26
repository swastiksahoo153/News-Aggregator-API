const handleJWTError = require("./authenticationHelper")
const getNewsArticles = require("../newsAPI")


const getUserPreferences = async (req, res) => {
    try {
        handleJWTError(req, res)
        const preferences = await req.user.getUserPreferences()
        res.status(200).json(preferences)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
}

const updateUserPreferences = async (req, res) => {
    try {
        handleJWTError(req, res)
        const { status } = await req.user.updateUserPreferences(req.body.preferences)
        if (status === true) {
            res.status(200).json({message: "User Preferences updated successfully"})
        } else {
            res.status(500).json({message: "Failed to update user preferences"})
        }
    } catch(err) {
        res.status(500).json({message: err.message})
    }
}

const getNewsForUser = async (req, res) => {
    try {
        handleJWTError(req, res)
        const preferences = await req.user.getUserPreferences()
        const articles = await getNewsArticles(preferences)
        res.status(200).json(articles)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

    handleJWTError(req, res)
    const {preferences} = req.user
    getNewsArticles(preferences).then(articles => {
        res.status(200).json(articles)
    }).catch(err => { 
        res.status(500).json({ message: err.message })
    })
}

module.exports = {getUserPreferences, updateUserPreferences, getNewsForUser}