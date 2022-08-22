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
    }

    return (
        <div>
            <NavBar />
            {!isLoading && message ? (
                <MessageComponent msg={message} />
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default MsgPage;
