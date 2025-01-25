"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const db_1 = __importDefault(require("./config/db"));
const colors_1 = __importDefault(require("colors"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./config/swagger"));
async function connectDB() {
    try {
        await db_1.default.authenticate();
        db_1.default.sync();
    }
    catch (error) {
        console.log(error);
        console.log(colors_1.default.red.bold('Hubo un error al conectar la DB'));
    }
}
connectDB();
//instancia de express
const server = (0, express_1.default)();
const corsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true);
        }
        else {
            callback(new Error('Error de cors'), false);
        }
    }
};
server.use((0, cors_1.default)(corsOptions));
//leer datos de formularios
server.use(express_1.default.json());
server.use((0, morgan_1.default)('dev'));
server.use('/api/products', routes_1.default);
server.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
exports.default = server;
//# sourceMappingURL=server.js.map