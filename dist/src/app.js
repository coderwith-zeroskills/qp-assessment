"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const db_1 = require("./config/db");
require("reflect-metadata"); // Required for TypeORM decorators
const app = (0, express_1.default)();
// Middleware to parse JSON
app.use(express_1.default.json());
// Admin and User routes
app.use("/admin", admin_routes_1.default);
app.use("/user", user_routes_1.default);
// Start the server and database connection
db_1.AppDataSource.initialize()
    .then(() => {
    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
})
    .catch((err) => console.log("Database connection failed:", err));
//# sourceMappingURL=app.js.map