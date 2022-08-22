import type { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";

type Props = {
    session: Session | null;
};

export default function UserInfo({ session }: Props) {
    return (
        <>
            {session ? (
                <div className="flex-container">
                    <h3 className="nav-profile-name">{session.user?.name}</h3>
                    <div className="nav-profile-image">
                        <Image
                            src={`${session?.user?.image}`}
                            alt="profile"
                            width={50}
                            height={50}
                        />
                    </div>
                    <button onClick={() => signOut()} className="nav-button">
                        <a>Sign Out</a>
                    </button>
                </div>
            ) : (
                <button onClick={() => signIn()} className="nav-button">
                    <a>Sign In</a>
                </button>
            )}
        </>
    );
}
