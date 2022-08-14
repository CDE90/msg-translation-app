import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";

const Check: NextPage = () => {
    const { data: session } = useSession();

    if (session) {
        return (
            <>
                {/* @ts-ignore */}
                Signed in as {session.user.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        );
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    );
};

export default Check;
