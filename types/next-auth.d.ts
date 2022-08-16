import NextAuth, { DefaultAccount } from "next-auth";

declare module "next-auth" {
    interface Session {
        account: DefaultAccount;
    }
}
