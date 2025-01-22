import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Cv Uygulaması",
    description: "Cv Uygulaması",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body
            className={`bg-background text-foreground ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="bg-primary text-white shadow-md">
                <div className="container mx-auto flex items-center justify-between py-4 px-6">
                    <h1 className="text-2xl font-bold text-white">
                        Özel Tevfik Fikret Okulları
                    </h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto py-12 px-4 flex justify-center items-center">
                <div className="w-full max-w-3xl bg-white shadow-md p-6 rounded-lg">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-primary-dark text-white p-6">
                <div className="container mx-auto text-center">
                    <div className="text-sm" style={{ paddingTop: 8  ,color: "white" }}>
                        © {new Date().getFullYear()} Tevfik Fikret Okulları. All
                        rights reserved.
                    </div>
                </div>
            </footer>
        </div>
        </body>
        </html>
    );
}
