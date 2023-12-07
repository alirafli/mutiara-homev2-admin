import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Topbar from "@/components/ui/topbar";
import { getUserById } from "@/lib/actions";
import Sidebar from "@/components/ui/sidebar";
import { ReduxProviders } from "@/lib/redux/provider";
import LogoutButton from "@/components/ui/logoutButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Root Layout",
  description: "Generated by create next app",
  icons: "favicon.png",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user } = await getUserById();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReduxProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex">
              <Sidebar logout={<LogoutButton />} />
              <div className="w-full">
                <Topbar user={user?.[0]} />
                {children}
              </div>
            </div>
          </ThemeProvider>
        </ReduxProviders>
      </body>
    </html>
  );
}
