const express = require('express');
const router = express.Router();
const { getRepository } = require('typeorm');
const Freelancer = require('../models/Freelancer');


// GET: Retrieve all freelancers
router.get('/', async (req, res) => {
    const freelancerRepository = getRepository(Freelancer);
    const freelancers = await freelancerRepository.find();
    res.json(freelancers);
  });

// GET: Retrieve a single freelancer by ID
router.get('/:id', async (req, res) => {
    const freelancerRepository = getRepository(Freelancer);
    try {
      const freelancer = await freelancerRepository.findOne({ where: { id: parseInt(req.params.id) } });

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
  const freelancerRepository = getRepository(Freelancer);
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
    const freelancerRepository = getRepository(Freelancer);
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
  const freelancerRepository = getRepository(Freelancer);
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

module.exports = router;
