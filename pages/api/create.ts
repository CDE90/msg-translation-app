import type { NextApiRequest, NextApiResponse } from "next";
import { newMessage } from "../../lib/db_tools";
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
    }

    res.status(200).json(await newMessage(msg, client));
}
