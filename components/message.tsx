import type { Message } from "../lib/db_tools";

type Props = {
    msg: Message;
};

export default function MessageComponent({ msg }: Props) {
    return (
        <div>
            <p>{msg.text}</p>
            <p>{msg.user.name}</p>
            <p>{msg.user.email}</p>
        </div>
    );
}
