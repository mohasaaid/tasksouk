const express = require('express');
const router = express.Router();
const { getRepository } = require('typeorm');
const ServiceOffer = require('../models/ServiceOffer');


router.get('/', async (req, res) => {
    const serviceOfferRepository = getRepository(ServiceOffer);
    try {
        const serviceOffers = await serviceOfferRepository.find({ relations: ["freelancer", "category"] });
        res.json(serviceOffers);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/:id', async (req, res) => {
    const serviceOfferRepository = getRepository(ServiceOffer);
    try {
        const serviceOffer = await serviceOfferRepository.findOne({ where: { id: parseInt(req.params.id) },relations: ["freelancer", "category"] });
        if (serviceOffer) {
            res.json(serviceOffer);
        } else {
            res.status(404).send('Service offer not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/', async (req, res) => {
    const serviceOfferRepository = getRepository(ServiceOffer);
    const serviceOffer = serviceOfferRepository.create(req.body); // Data validation should be handled appropriately
    try {
        const result = await serviceOfferRepository.save(serviceOffer);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/:id', async (req, res) => {
    const serviceOfferRepository = getRepository(ServiceOffer);
    try {
        let serviceOffer = await serviceOfferRepository.findOne(req.params.id);
        if (serviceOffer) {
            serviceOfferRepository.merge(serviceOffer, req.body);
            const result = await serviceOfferRepository.save(serviceOffer);
            res.json(result);
        } else {
            res.status(404).send('Service offer not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.delete('/:id', async (req, res) => {
    const serviceOfferRepository = getRepository(ServiceOffer);
    try {
        const result = await serviceOfferRepository.delete(req.params.id);
        if (result.affected === 0) {
            res.status(404).send('Service offer not found');
        } else {
            res.status(204).send(); // No content to send back
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
