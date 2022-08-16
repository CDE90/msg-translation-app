import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginBtn() {
    const { data: session } = useSession();
    if (session) {
        return (
            <>
                {/* @ts-ignore */}
                Signed in as {session.user.email} using{" "}
                {session?.account?.provider}{" "}
                <button onClick={() => signOut()}>Sign out</button>
            </>
        );
    }
    return (
        <>
            Not signed in
            <button onClick={() => signIn()}>Sign in</button>
        </>
    );
}
