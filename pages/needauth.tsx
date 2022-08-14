import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import LoginBtn from "../components/login-btn";

const NeedAuth: NextPage = () => {
    const { data: session, status } = useSession({
        required: true,
    });

    return (
        <div>
            <h1>NeedAuth</h1>
            <p>This page requires authentication.</p>
            <p>{status === "loading" ? "Loading..." : null}</p>
            <p>{session ? JSON.stringify(session) : null}</p>
            <LoginBtn />
        </div>
    );
};

export default NeedAuth;
