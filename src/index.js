const express = require('express');
const {createConnection} = require('typeorm');

const app = express();
app.use(express.json());

createConnection().then(connection => {
    // Assuming you might have routes defined elsewhere
    const categoryRoutes = require('./routes/categoryRoutes');
    const freelancerRoutes = require('./routes/freelancerRoutes');

    app.use('/categories', categoryRoutes);
    app.use('/freelancers', freelancerRoutes);

    app.listen(3000, () => console.log('Server running on port 3000'));
}).catch(error => console.error('Error connecting to the database', error));



// require("reflect-metadata");
// const express = require("express");
// const { createConnection } = require("typeorm");
// const Category = require("./src/models/Category");

// createConnection().then(async connection => {
//     const app = express();
//     const port = 3000;

//     app.use(express.json());

//     // Create a new category
//     app.post("/categories", async (req, res) => {
//         const categoryRepository = connection.getRepository(Category);
//         const category = categoryRepository.create(req.body);
//         await categoryRepository.save(category);
//         res.status(201).json(category);
//     });

//     // Get all categories
//     app.get("/categories", async (req, res) => {
//         const categoryRepository = connection.getRepository(Category);
//         const categories = await categoryRepository.find();
//         res.json(categories);
//     });

//     // Get a single category by ID
//     app.get("/categories/:id", async (req, res) => {
//         const categoryRepository = connection.getRepository(Category);
//         const category = await categoryRepository.findOne(req.params.id);
//         if (!category) {
//             return res.status(404).json({ message: "Category not found" });
//         }
//         res.json(category);
//     });

//     // Update a category
//     app.put("/categories/:id", async (req, res) => {
//         const categoryRepository = connection.getRepository(Category);
//         let category = await categoryRepository.findOne(req.params.id);
//         if (!category) {
//             return res.status(404).json({ message: "Category not found" });
//         }
//         categoryRepository.merge(category, req.body);
//         const result = await categoryRepository.save(category);
//         res.json(result);
//     });

//     // Delete a category
//     app.delete("/categories/:id", async (req, res) => {
//         const categoryRepository = connection.getRepository(Category);
//         const result = await categoryRepository.delete(req.params.id);
//         if (result.affected === 0) {
//             return res.status(404).json({ message: "Category not found" });
//         }
//         res.status(204).send();
//     });

//     app.listen(port, () => {
//         console.log(`Server running on port ${port}`);
//     });
// }).catch(error => console.error('Error connecting to the database', error));
