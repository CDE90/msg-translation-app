import { useRouter } from "next/router";
import NavBar from "../../components/navbar";
import MessageComponent from "../../components/message";
import { useMessage } from "../../lib/clientTools";

const MsgPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { message, isLoading, isError } = useMessage(id as string);

    if (isError) {
        router.push("/");
        return;
    } else if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <NavBar />
            {message ? <MessageComponent msg={message} /> : null}
            {/* <MessageComponent msg={message} /> */}
        </div>
    );
};

export default MsgPage;
