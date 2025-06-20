const express = require("express");
const router = express.Router();
const profileService = require("../services/profile.service");
const getMulterUpload = require("../functions/imageStorage");

const upload = getMulterUpload();

router.get("/userProfile", async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ message: "Not logged in" });

    const profile = await profileService.getProfileById(userId);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch profile", error: error.message });
  }
});

router.put("/updateProfile", upload.single("picture"), async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ message: "Not logged in" });

    const {
      name,
      surname,
      city,
      postcode,
      address,
      phone,
      contact_email,
      contact_phone,
    } = req.body;

    const picture = req.file ? req.file.filename : null;

    const updatedProfile = await profileService.updateProfile(
      userId,
      name,
      surname,
      city,
      postcode,
      address,
      phone,
      contact_email ? 1 : 0,
      contact_phone ? 1 : 0,
      picture
    );

    res.json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update profile", error: error.message });
  }
});

module.exports = router;
