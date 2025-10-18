import { DataTypes } from 'sequelize';
import  sequelize  from '../config/database.js';

export const ChemicalCompound = sequelize.define('ChemicalCompound', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    image: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
}, {
    timestamps: true,
});


