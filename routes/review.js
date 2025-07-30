const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync");
const Review = require("../models/review.js");
const { validateReview } = require("../middleware.js");
// const {isLoggedIn} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");


//post reviews route
//reviews ke ander POST route
router.post("/", validateReview
  // , isLoggedIn
  , wrapAsync(reviewController.createReview));

//delete review route
router.delete("/:reviewId", wrapAsync(reviewController.destroyReview));

module.exports = router;