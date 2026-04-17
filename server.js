import app from './app.js';
import config from './config/index.js'

const serverStart = async () => {

    try {


        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        })
    } catch (error) {
        console.error("Error starting the server:", error);
        process.exit(1);
    }
}

serverStart();