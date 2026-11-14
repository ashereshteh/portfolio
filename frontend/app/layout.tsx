import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const iranSansX = localFont({
    src: [
        {
            path: './fonts/IRANSansX-Regular.woff2',
            weight: 'normal',
            style: 'normal',
        },
        {
            path: './fonts/IRANSansX-Bold.woff2',
            weight: 'bold',
            style: 'normal',
        },
    ],
    display: 'swap',
    variable: '--font-iran-sans-x',
});

export const metadata: Metadata = {
    title: "امیرحسین عمادی (Amirhossein Emadi)",
    description: "وب سایت نمونه کارهای من",
};

export default function RootLayout({children}: LayoutProps<"/">) {
    return (
        <html lang="fa" dir="rtl" className={`${geistSans.variable} ${geistMono.variable} ${iranSansX.variable} h-full antialiased`}>
            <body className="min-h-full">
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
