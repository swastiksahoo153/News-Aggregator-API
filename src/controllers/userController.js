const handleJWTError = require("./authenticationHelper")


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



module.exports = {getUserPreferences, updateUserPreferences}