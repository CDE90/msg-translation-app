import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getMessage, Message } from "../../../lib/DBTools";
import clientPromise from "../../../lib/_mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req });
    const client = await clientPromise;

    const { id } = req.query;

    if (id === undefined) {
        return res.status(404).json({ error: "Unknown ID" });
    }

    let message: Message;

    try {
        message = await getMessage(id.toString(), client);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: "Unknown error" });
        }
    }

    // check if the user is the owner of the message
    if (
        message.user.email === session?.user?.email &&
        message.user.provider === session?.account?.provider
    ) {
        message.isOwner = true;
    } else {
        message.isOwner = false;
    }

    return res.status(200).json(message);
}
