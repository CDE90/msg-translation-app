import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/app-logo.png";

export default function NavBar() {
    const { data: session } = useSession();

    return (
        <nav>
            <div className="nav-wrapper">
                <Link href="/">
                    <a className="brand-logo">
                        <Image src={logo} alt="logo" />
                    </a>
                </Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <Link href="/create">
                            <a>Create a message!</a>
                        </Link>
                    </li>
                    <li>
                        {session ? (
                            <div>
                                <h3>{session.user?.name}</h3>
                                <Image
                                    src={`${session?.user?.image}`}
                                    alt="profile"
                                    width={50}
                                    height={50}
                                />
                                <button onClick={() => signOut()}>
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => signIn()}>Sign In</button>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}
