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

    let picture;
    if (req.file) {
      picture = req.file.filename;
    } else if (req.body.removePicture === "true") {
      picture = null;
    } else {
      picture = req.body.existingPicture || null;
    }
    const updatedProfile = await profileService.updateProfile(
      userId,
      name,
      surname,
      city,
      postcode,
      address,
      phone,
      Number(contact_email),
      Number(contact_phone),
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

router.get("/reviews", async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ message: "Not logged in" });

    const reviews = await profileService.getUserReviews(userId);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user reviews",
      error: error.message,
    });
  }
});

module.exports = router;
