const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/authorization');
const Product = require('../models/Product');

// get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// get a product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).json({ msg: 'Product not found.' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.post('/', [
  auth,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('quantity', 'Quantity is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, description, category, price, brand, quantity } = req.body;
      const newProduct = new Product({
        userId: req.user.id,
        name,
        description,
        category,
        price,
        brand,
        quantity,
      });
      const product = await newProduct.save();
      res.status(201).json({ product });
    } catch (error) {
      res.status(500).json({ msg: 'Server Error' });
    }
  },
]);

module.exports = router;
