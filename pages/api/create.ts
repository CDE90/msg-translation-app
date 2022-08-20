import type { NextApiRequest, NextApiResponse } from "next";
import { newMessage } from "../../lib/DBTools";
import { getSession } from "next-auth/react";
import clientPromise from "../../lib/_mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req });
    const client = await clientPromise;
    const msg = req.body;

    if (!session) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    } else if (msg.user.email !== session?.user?.email ||
        msg.user.provider !== session?.account?.provider) {
        res.status(403).json({ error: "Forbidden" });
        return;
    } else if (!msg.title || !msg.content || !msg.user) {
        res.status(400).json({ error: "Bad request" });
        return;
    }

    try {
        const message = await newMessage(msg, client);

        res.status(200).json(message);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Unknown error" });
        }
    }
}
