import type { Metadata } from "next";
import { Inter , Space_Grotesk} from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";

const inter = Inter({ subsets: ["latin"],
  weight: ["100","200","300","400", "500", "600", "700" , "800","900"],
  variable: "--font-inter ",
 });

 const spaceGrotesk = Space_Grotesk({ subsets: ["latin"],
  weight: ["300","400", "500", "600", "700"],
  display: "swap",
  variable: "--font-spaceGrotesk ",
 });

export const metadata: Metadata = {
  title: "Dev Flow",
  description: "Powered by next 14",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider 
    appearance={{
      elements: {
        formButtonPrimary: 'primary-gradient',
        footerActionLink: 'primary-text-gradient hover: text-primary-500'
      }
    }}>
    <html lang='en'>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        {children}
      </body>
    </html>
  </ClerkProvider>
  );
}
