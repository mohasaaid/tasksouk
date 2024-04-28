const express = require('express');
const router = express.Router();
const { getRepository } = require('typeorm');
const FreelancerProfile = require('../models/Freelancer');


// GET: Retrieve all freelancers
router.get('/', async (req, res) => {
    const freelancerRepository = getRepository(FreelancerProfile);
    const freelancers = await freelancerRepository.find();
    res.json(freelancers);
  });

// GET: Retrieve a single freelancer by ID
router.get('/:id', async (req, res) => {
    const freelancerRepository = getRepository(FreelancerProfile);
    try {
      const freelancer = await freelancerRepository.findOne({
        where: { userId: parseInt(req.params.id) },
        relations: ["reviews", "reviews.reviewer"] 
    });
      if (freelancer) {
        res.json(freelancer);
      } else {
        res.status(404).send('Freelancer not found');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
// POST: Create a new freelancer
router.post('/', async (req, res) => {
  const freelancerRepository = getRepository(FreelancerProfile);
  const freelancer = freelancerRepository.create(req.body);
  try {
    const result = await freelancerRepository.save(freelancer);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// PUT: Update an existing freelancer
router.put('/:id', async (req, res) => {
    const freelancerRepository = getRepository(FreelancerProfile);
    try {
      const freelancer = await freelancerRepository.findOne({ where: { id: parseInt(req.params.id) } });
      if (freelancer) {
        freelancerRepository.merge(freelancer, req.body);
        const result = await freelancerRepository.save(freelancer);
        res.send(result);
      } else {
        res.status(404).send('Freelancer not found');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
// DELETE: Delete a freelancer
router.delete('/:id', async (req, res) => {
  const freelancerRepository = getRepository(FreelancerProfile);
  try {
    const result = await freelancerRepository.delete(req.params.id);
    if (result.affected === 0) {
      res.status(404).send('Freelancer not found');
    } else {
      res.status(204).send();  // No content to send back
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});



router.get('/:id/service-requests', async (req, res) => {
  const freelancerRepository = getRepository(FreelancerProfile);
  try {
      const freelancer = await freelancerRepository.findOne({
          where: { userId: parseInt(req.params.id) },
          relations: ["serviceOffers", "serviceOffers.serviceRequests"] // Include nested relations
      });      
      if (freelancer) {
          // Extract service requests from service offers
          const serviceRequests = freelancer.serviceOffers.flatMap(offer => offer.serviceRequests);
          res.json(serviceRequests);
      } else {
          res.status(404).send('Freelancer not found');
      }
  } catch (error) {
      res.status(500).send(error.message);
  }
});


module.exports = router;
