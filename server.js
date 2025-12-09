require("module-alias/register");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const compression = require("compression");


const connectDB = require("@/utils/connections/database/connectDB");
const requestMetrics = require("@/utils/middleware/requestMetrics");

const PORT = process.env.BACKEND_PORT || 5001;

const http = require("http");
const { initializeSocket } = require("@/utils/connections/database/socket");


const app = express();
const socketApp = express();
const socketServer = http.createServer(socketApp);
// Connect to Database and Start Server
async function startServer() {
    try {
        await connectDB();


        // Json Body
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use(compression({
            level: 6,
            threshold: 0
        }));

        // CORS Policy
        app.use(cors({ origin: "*" }));

        // Request Display Middleware
        app.use(requestMetrics);

        // Account API Routes
        // app.use(require("@/routes/action.route"));

        // app.use(require("@/routes/authentication.route"));

        // app.use(require("@/routes/user-role.route"));

        initializeSocket(socketServer)

        // Start the Socket Server
        const SOCKET_PORT = process.env.SOCKET_PORT || 5051;
        socketServer.listen(SOCKET_PORT, () => {
            console.warn(`Socket.IO server running on port ${SOCKET_PORT} : Worker ${process.pid}`);
        });

        // Start the server
        const server = app.listen(PORT, () => {
            console.warn(`🚀 Worker ${process.pid} is running on port: ${PORT}`);
        });

        // ✅ graceful shutdown handlers
        process.on("SIGINT", shutdown);
        process.on("SIGTERM", shutdown);

        async function shutdown() {
            console.warn(`Worker ${process.pid} shutting down...`);
            server.close(() => {
                console.log("HTTP server closed.");
            });
        }
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    }
}

startServer();
