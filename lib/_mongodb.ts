import { MongoClient } from "mongodb";

let uri: string;

if (process.env.MONGODB_URI === undefined) {
    throw new Error("MONGODB_URI is not set");
} else {
    uri = process.env.MONGODB_URI;
}
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
}

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;
