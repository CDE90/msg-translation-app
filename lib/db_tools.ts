import { MongoClient } from "mongodb";
import { nanoid } from "nanoid";

export async function newId(client: MongoClient): Promise<string> {
    const id = nanoid(13);

    try {
        const db = client.db("messages");
        const collection = db.collection("messages");
        const result = await collection.findOne({ _id: id });
        if (result) {
            return newId(client);
        }
        return id;
    } catch (error) {
        throw error;
    }
}

export type PartialMessage = {
    _id?: string;
    title: string;
    content: string;
    createdAt?: number;
    user: {
        email: string;
        image?: string;
        name: string;
        provider: string;
    };
};

export type Message = PartialMessage & {
    _id: string;
    createdAt: number;
    history?: Message;
    isOwner?: boolean;
};

function convertDateToUTC(date: Date): number {
    return Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
    );
}

export async function newMessage(
    partialMessage: PartialMessage,
    client: MongoClient
): Promise<Message> {
    try {
        if (
            partialMessage.title === undefined ||
            partialMessage.content === undefined ||
            partialMessage.user === undefined ||
            partialMessage.user.email === undefined ||
            partialMessage.user.name === undefined
        ) {
            throw new Error("Invalid message");
        }
        const message: Message = {
            ...partialMessage,
            _id: await newId(client),
            createdAt: convertDateToUTC(new Date()),
        };

        const db = client.db("messages");
        const collection = db.collection<Message>("messages");
        await collection.insertOne(message);
        return message;
    } catch (error) {
        throw error;
    }
}

export async function getMessage(
    id: string,
    client: MongoClient | Promise<MongoClient>
): Promise<Message> {
    if (client instanceof Promise) {
        client = await client;
    }

    try {
        const db = client.db("messages");
        const collection = db.collection("messages");
        const result = await collection.findOne({ _id: id });
        if (!result) {
            throw new Error("Message not found");
        }

        const r: any = result;
        delete r._id;

        const message: Message = {
            _id: id,
            ...r,
        };
        return message;
    } catch (error) {
        throw error;
    }
}
