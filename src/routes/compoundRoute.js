import express from 'express';
import {
  createCompound,
  getAllCompounds,
  getCompoundById,
  updateCompound,
  deleteCompound,
} from '../controllers/compoundController.js';
import  {authenticate} from '../middlewares/authentication.js';
import  {authorize}  from '../middlewares/authorization.js';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const compounds = await getAllCompounds(page, limit);
    res.json(compounds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const compound = await getCompoundById(req.params.id);
    res.json(compound);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

router.post('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { name, image, description } = req.body;
    const compound = await createCompound(name, image, description);
    res.status(201).json(compound);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const compound = await updateCompound(req.params.id, req.body);
    res.json(compound);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const result = await deleteCompound(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
