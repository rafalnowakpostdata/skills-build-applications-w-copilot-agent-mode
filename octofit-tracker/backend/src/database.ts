import mongoose from 'mongoose';

const localMongoUri = 'mongodb://localhost:27017/octofit_db';

export const mongoUri = process.env.MONGO_URI || localMongoUri;

export const connectToDatabase = async () => mongoose.connect(mongoUri);
