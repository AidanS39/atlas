import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI as string;

if (!uri) {
    throw new Error("Please define MONGODB_URI in your environment variables");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export async function getDb(dbName?: string): Promise<Db> {
    const client = await clientPromise;
    return client.db(dbName);
}

export default clientPromise;

export async function ensureIndexes(): Promise<void> {
    const db = await getDb();
    // this is compounding the index between the user id of the specified user
    // and the specified paperId within the saved folder for the user
    // ensures fast lookup times and prevents duplicates within mongodb
    await db.collection("saved_papers").createIndex({ userId: 1, paperId: 1 }, { unique: true });
    // index solely on userId alone for fetching the user's saved "saved_papers"
    await db.collection("saved_papers").createIndex({ userId: 1 });
    // indexing at the savedAt for sorting by the most recently saved
    await db.collection("saved_papers").createIndex({ savedAt: -1 });

    console.log("MongoDB indexes ensured!");
}
