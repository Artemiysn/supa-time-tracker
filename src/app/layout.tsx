import type { Metadata } from "next";
import "./globals.css";
import { db } from "@/modules/db";
import Link from "next/link";
import NewAccountCreator from "@/components/NewAccountCreator";


// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const accounts = await db.account.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <html lang="en">
      <body className={`flex h-screen`}>
      <div className="flex flex-col gap-4 bg-slate-800 text-slate-100 w-[240px] p-4">
          {accounts.map((account) => (
            <Link key={account.id} href={`/accounts/${account.id}`}>
              {account.name}
            </Link>
          ))}
          <NewAccountCreator />
        </div>

        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
