const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { validateListing } = require("../middleware.js");
const {isLoggedIn} = require("../middleware.js");
const {isOwner} = require("../middleware.js");
const {isreviewAuthor} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage});

//Index Route
router.route("/")
  .get(wrapAsync(listingController.index))
//create route
.post( 
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
     wrapAsync(listingController.createListing));

//New Route
router.get("/new",
  isLoggedIn,
  listingController.renderNewForm);

//Show Route
router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  //update route
  .put(
    isLoggedIn,isOwner,
    upload.single("listing[image]"),
    validateListing, wrapAsync(listingController.updateListing))
  //delete route
  .delete(
    isLoggedIn,isOwner,isreviewAuthor,
    wrapAsync(listingController.destroyListing));

//Edit Route
router.get("/:id/edit"
   , isLoggedIn,isOwner,
  wrapAsync(listingController.renderEditForm));

module.exports = router;