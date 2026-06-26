"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = exports.mongoUri = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const localMongoUri = 'mongodb://localhost:27017/octofit_db';
exports.mongoUri = process.env.MONGO_URI || localMongoUri;
const connectToDatabase = async () => mongoose_1.default.connect(exports.mongoUri);
exports.connectToDatabase = connectToDatabase;
