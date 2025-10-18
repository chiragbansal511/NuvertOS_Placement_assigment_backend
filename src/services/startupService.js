import { connectDB } from '../config/database.js';
import sequelize from "../config/database.js";
import transporter from '../controllers/emailController.js';

export const startServer = async (app, port) => {

    const isDBConnected = await connectDB();
    if (!isDBConnected) {
        console.error('Server startup aborted. Database not connected.');
        process.exit(1);
    }

    try {
        await transporter.verify();
        console.log('Email service connected and ready.');
    } catch (emailError) {
        console.error('Email service not reachable:', emailError.message);
    }

    try {
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
