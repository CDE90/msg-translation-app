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
                    <a>
                        <Image
                            className="nav-logo"
                            width={50}
                            height={50}
                            src={logo}
                            alt="logo"
                        />
                    </a>
                </Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li className="nav-list-item">
                        <Link href="/create">
                            <a className="nav-button">Create a message!</a>
                        </Link>
                    </li>
                    <li className="nav-list-item">
                        {session ? (
                            <div className="flex-container">
                                <h3 className="nav-profile-name">
                                    {session.user?.name}
                                </h3>
                                <div className="nav-profile-image">
                                    <Image
                                        src={`${session?.user?.image}`}
                                        alt="profile"
                                        width={50}
                                        height={50}
                                    />
                                </div>
                                <button
                                    onClick={() => signOut()}
                                    className="nav-button"
                                >
                                    <a>Sign Out</a>
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => signIn()}
                                className="nav-button"
                            >
                                <a>Sign In</a>
                            </button>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}
