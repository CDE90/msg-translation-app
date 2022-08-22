import type { NextApiRequest, NextApiResponse } from "next";
import { editMessage, getMessage } from "../../../lib/DBTools";
import { getSession } from "next-auth/react";
import clientPromise from "../../../lib/_mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req });
    const client = await clientPromise;
    const msg = req.body;
    const { id } = req.query;

    if (!id || typeof id !== "string") {
        res.status(400).json({ error: "Bad Request" });
        return;
    } else if (!session) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const oldMessage = await getMessage(id, client);

    if (
        msg.user.email !== oldMessage.user.email ||
        msg.user.provider !== oldMessage.user.provider
    ) {
        res.status(400).json({ error: "Bad Request" });
        return;
    }

    try {
        await editMessage(id, msg, client);

        res.status(200).json({ complete: true });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Unknown error" });
        }
    }
}
