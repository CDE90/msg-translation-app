import { useRouter } from "next/router";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import NavBar from "../../components/navbar";
import type { Message } from "../../lib/db_tools";
import { getMessage } from "../../lib/db_tools";
import clientPromise from "../../lib/_mongodb";
import MessageComponent from "../../components/message";

type Props = {
    msg: Message;
};

const MsgPage: NextPage<Props> = ({ msg }: Props) => {
    const router = useRouter();
    const { id } = router.query;
    return (
        <div>
            <NavBar />
            <p>{id}</p>
            <MessageComponent msg={msg} />
        </div>
    );
};

export const getStaticPaths = async () => {
    const client = await clientPromise;

    const messages = await client
        .db("messages")
        .collection("messages")
        .find({})
        .toArray();
    const paths = messages.map((message) => ({
        params: {
            id: message._id,
        },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const id = context.params?.id as string;

    const client = await clientPromise;

    const message = await getMessage(id, client);

    return {
        props: { msg: message },
    };
};

export default MsgPage;
