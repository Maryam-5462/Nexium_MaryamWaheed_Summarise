import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const options = {};

let client = new MongoClient(uri, options);
let clientPromise = client.connect();

export default clientPromise;
