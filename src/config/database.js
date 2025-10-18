import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelizeorm = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    }
);

export const connectDB = async () => {
  try {
    await sequelizeorm.authenticate();
    console.log('Database connected successfully.');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};

// To run sql query directly

// (async () => {
//   try {
//     await connectDB();
//     await sequelizeorm.query('DROP TABLE IF EXISTS ChemicalCompounds;');
//     console.log('✅ Users table deleted successfully.');
//   } catch (error) {
//     console.error('Error deleting users table:', error);
//   } finally {
//     await sequelizeorm.close();
//   }
// })();

export default sequelizeorm;
 