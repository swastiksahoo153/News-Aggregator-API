const { updateUserPreferences, getUserPreferences } = require("../services");

const getUserPreferencesController = async (req, res) => {
  try {
    const preferences = await getUserPreferences(req.user.id);
    res.status(200).json(preferences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUserPreferencesController = async (req, res) => {
  try {
    const { status } = await updateUserPreferences(
      req.user.id,
      req.body.preferences
    );
    if (status === true) {
      res
        .status(200)
        .json({ message: "User Preferences updated successfully" });
    } else {
      res.status(500).json({ message: "Failed to update user preferences" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUserPreferencesController,
  updateUserPreferencesController,
};
