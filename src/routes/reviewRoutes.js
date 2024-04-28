const express = require('express');
const router = express.Router();
const { getRepository } = require('typeorm');
const Review = require('../models/Review');

router.get('/', async (req, res) => {
    const reviewRepository = getRepository(Review);
    const reviews = await reviewRepository.find();
    res.json(reviews);
});


// GET: Retrieve a single freelancer by ID
router.get('/:id', async (req, res) => {
    const reviewRepository = getRepository(Review);
    try {
      const review = await reviewRepository.findOne({
        where: { id: parseInt(req.params.id) },
        // relations: ["user", "freelancerProfile"]   // Ensuring to load related user and reviews
    });
      if (review) {
        res.json(review);
      } else {
        res.status(404).send('review not found');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  

module.exports = router;
