const express = require('express');
const router = express.Router();
const { getRepository } = require('typeorm');
const Category = require('../models/Category');

// GET all categories
router.get('/', async (req, res) => {
    const categoryRepository = getRepository(Category);
    const categories = await categoryRepository.find();
    res.json(categories);
});

// GET a single category by ID using findOne correctly
router.get('/:id', async (req, res) => {
    const categoryRepository = getRepository(Category);
    const category = await categoryRepository.findOne({ where: { id: parseInt(req.params.id) } });
    if (category) {
        res.json(category);
    } else {
        res.status(404).send('Category not found');
    }
});


// POST create a new category
router.post('/', async (req, res) => {
    const categoryRepository = getRepository(Category);
    const category = categoryRepository.create(req.body);
    try {
        const result = await categoryRepository.save(category);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// PUT update an existing category
router.put('/:id', async (req, res) => {
    const categoryRepository = getRepository(Category);
    // const category = await categoryRepository.findOne({ where: { id: parseInt(req.params.id) } });
    const category = await categoryRepository.findOne({
        where: { id: parseInt(req.params.id) }
    });
    if (category) {
        categoryRepository.merge(category, req.body);
        const result = await categoryRepository.save(category);
        res.send(result);
    } else {
        res.status(404).send('Category not found');
    }
});

// DELETE a category
router.delete('/:id', async (req, res) => {
    const categoryRepository = getRepository(Category);
    const result = await categoryRepository.delete(parseInt(req.params.id));
    if (result.affected === 0) {
        res.status(404).send('Category not found');
    } else {
        res.status(204).send();  // No content to send back
    }
});

module.exports = router;
