import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const monaSansRegular = localFont({
  src: "../../public/mona-sans-regular.713fcaa7526f9beb.woff2",
  variable: "--font-mona-regular",
  weight: "400",
});
const monaSansMedium = localFont({
  src: "../../public/mona-sans-medium.c9b12174526f9beb.woff2",
  variable: "--font-mona-medium",
  weight: "500",
});

export const metadata: Metadata = {
  title: "promptedsite - Ace breaker",
  description: "Play and break as many bricks as you can",
  themeColor: "#000000",
  viewport: "width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/vendor.9fe35287526f9beb.css" />
        <link rel="stylesheet" href="/main.bde6de19526f9beb.css" />
        <style dangerouslySetInnerHTML={{ __html: `
          svg.home-title { opacity: 0 !important; pointer-events: none !important; }
          svg.icon-logo-promptedsite { display: none !important; }
          .page .tennis-racket, .page .tennis-logo-container,
          .home-container .tennis-racket, .home-top .tennis-racket { display: none !important; }
        ` }} />
      </head>
      <body className={`${monaSansRegular.variable} ${monaSansMedium.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
