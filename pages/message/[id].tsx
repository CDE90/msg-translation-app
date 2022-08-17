import { useRouter } from "next/router";
import type { NextPage } from "next";
import NavBar from "../../components/navbar";
import MessageComponent from "../../components/message";
import { useMessage } from "../../lib/clientTools";

const MsgPage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { message, isLoading, isError } = useMessage(id as string);

    if (isError) {
        router.push("/");
    } else if (isLoading) {
        return <div>Loading...</div>;
    } else if (!message) {
        return <div>No message found</div>;
    }

    return (
        <div>
            <NavBar />
            {/* <p>{id}</p> */}
            <MessageComponent msg={message} />
        </div>
    );
};

export default MsgPage;
