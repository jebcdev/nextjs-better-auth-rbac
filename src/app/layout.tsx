import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, Noto_Sans, EB_Garamond } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TanStackQueryProvider } from "@/features/shared/components";
import {GeneralHeader, Toaster } from "@/features/shared/components/ui";


import {
    generateAsyncDescription,
    generateAsyncTitle,
} from "@/lib/seo";
import { getSessionDetails } from "@/lib/auth/session-details";

const ebGaramondHeading = EB_Garamond({subsets:['latin'],variable:'--font-heading'});

const notoSans = Noto_Sans({subsets:['latin'],variable:'--font-sans'});

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: await generateAsyncTitle(),
        description: await generateAsyncDescription(),
    };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
        const { currentUser, isAdmin, isSuperAdmin } =
        await getSessionDetails();
    return (
        <html
            lang="en"
            className={cn(
                        "h-full",
                        "antialiased",
                        geistSans.variable,
                        geistMono.variable,
                        jetbrainsMono.variable,
                     "font-sans", notoSans.variable, ebGaramondHeading.variable)}
        >
            <body className="min-h-full flex flex-col dark">
                <TanStackQueryProvider>
                                        <GeneralHeader currentUser={currentUser} isAdmin={isAdmin} isSuperAdmin={isSuperAdmin} />

                    <Toaster
                        duration={3000}
                        position="top-right"
                        richColors
                        theme="dark"
                        closeButton
                    />
                    {children}
                </TanStackQueryProvider>
            </body>
        </html>
    );
}
