import { json } from 'express';

let cats = [
    { id: '1', name: 'Fluffy', age: 3 },
    { id: '2', name: 'Whiskers', age: 2 },
    { id: '3', name: 'Muffin', age: 1 }
];

const catControllers = {
    getCats: (req, res) => {
        res.status(200).json(cats);
    },
    getCatById: (req, res) => {
        const { id } = req.params;
        const catExist = cats.find((cat) => cat.id === id);

        if (catExist) {
            res.status(200).json(catExist);
        } else {
            res.status(404).json({ message: 'Cat not found!' });
        }
    },
    addCat: (req, res) => {
        const { name, age } = req.body;
        if (!name && !age) {
            res.status(400).json({ message: 'Please provide name and age' });
        } else {
            const newCat = { id: String(cats.length + 1), name, age };
            cats.push(newCat);
            res.status(201).json(newCat);
        }
    },
    updateCat: (req, res) => {
        const { id } = req.params;
        const { name, age } = req.body;

        const catExist = cats.find((cat) => cat.id === id);
        if (catExist) {
            if (name && age) {
                catExist.name = name;
                catExist.age = age;
                res.status(200).json(catExist);
            } else {
                res.status(400).json({
                    message: 'Please provide name and age'
                });
            }
        } else {
            res.status(404).json({ message: 'Please provide' });
        }
    },
    deleteCat: (req, res) => {
        const { id } = req.params;

        cats = cats.filter((cat) => cat.id !== id);
        res.status(200).json({ message: 'cat is delete successfully' });
    }
};

export default catControllers;
