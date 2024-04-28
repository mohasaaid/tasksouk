const express = require('express');
const router = express.Router();
const { getRepository } = require('typeorm');
const ServiceRequest = require('../models/ServiceRequest');


router.get('/', async (req, res) => {
    const ServiceRequestRepository = getRepository(ServiceRequest);
    try {
        const ServiceRequests = await ServiceRequestRepository.find();
        res.json(ServiceRequests);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/:id', async (req, res) => {
    const ServiceRequestRepository = getRepository(ServiceRequest);
    try {
        const ServiceRequest = await ServiceRequestRepository.findOne({ where: { id: parseInt(req.params.id) }, relations: ["serviceOffer"] });
        if (ServiceRequest) {
            res.json(ServiceRequest);
        } else {
            res.status(404).send('Service request not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// router.get('/:id', async (req, res) => {
//     const ServiceRequestRepository = getRepository(ServiceRequest);
//     try {
//         const ServiceRequest = await ServiceRequestRepository.findOne({ where: { id: parseInt(req.params.id) },relations: ["freelancer", "category"] });
//         if (ServiceRequest) {
//             res.json(ServiceRequest);
//         } else {
//             res.status(404).send('Service offer not found');
//         }
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

// router.post('/', async (req, res) => {
//     const ServiceRequestRepository = getRepository(ServiceRequest);
//     const ServiceRequest = ServiceRequestRepository.create(req.body); // Data validation should be handled appropriately
//     try {
//         const result = await ServiceRequestRepository.save(ServiceRequest);
//         res.status(201).json(result);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

// router.put('/:id', async (req, res) => {
//     const ServiceRequestRepository = getRepository(ServiceRequest);
//     try {
//         let ServiceRequest = await ServiceRequestRepository.findOne(req.params.id);
//         if (ServiceRequest) {
//             ServiceRequestRepository.merge(ServiceRequest, req.body);
//             const result = await ServiceRequestRepository.save(ServiceRequest);
//             res.json(result);
//         } else {
//             res.status(404).send('Service offer not found');
//         }
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });


// router.delete('/:id', async (req, res) => {
//     const ServiceRequestRepository = getRepository(ServiceRequest);
//     try {
//         const result = await ServiceRequestRepository.delete(req.params.id);
//         if (result.affected === 0) {
//             res.status(404).send('Service offer not found');
//         } else {
//             res.status(204).send(); // No content to send back
//         }
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

module.exports = router;
