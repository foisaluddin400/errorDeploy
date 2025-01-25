/* eslint-disable react/prop-types */
import React from "react";
import localFont from "next/font/local";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import ReduxProvider from "@/provider/ReduxProvider";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "JusBuy Website",
  description: "E-commerce",
};

export default async function RootLayout({ children, params }) {
  const locale = (await params).locale;

  
  if (!routing.locales.includes(locale)) {
    return redirect("/not-found");
  }

  
  const messages = await getMessages();
  return (
    <html lang={locale} data-theme="product">
      <body
        className={`${geistSans.variable} bg-white ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
        <NextIntlClientProvider messages={messages}>
        <Toaster />
          <div className="  text-black">{children}</div>{" "}
          
        </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
