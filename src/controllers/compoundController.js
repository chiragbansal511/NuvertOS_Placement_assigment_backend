import { ChemicalCompound } from '../models/chemicalCompound.js';

export const createCompound = async (name, image, description) => {
  return await ChemicalCompound.create({ name, image, description });
};

// ✅ Paginated fetch
export const getAllCompounds = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  const { rows, count } = await ChemicalCompound.findAndCountAll({
    offset,
    limit,
    order: [['createdAt', 'DESC']],
  });

  return {
    totalItems: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    compounds: rows,
  };
};

export const getCompoundById = async (id) => {
  const compound = await ChemicalCompound.findByPk(id);
  if (!compound) throw new Error('Compound not found');
  return compound;
};

export const updateCompound = async (id, data) => {
  const compound = await ChemicalCompound.findByPk(id);
  if (!compound) throw new Error('Compound not found');

  await compound.update(data);
  return compound;
};

export const deleteCompound = async (id) => {
  const compound = await ChemicalCompound.findByPk(id);
  if (!compound) throw new Error('Compound not found');

  await compound.destroy();
  return { message: 'Compound deleted successfully' };
};
