import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

import { Web3Modal } from "@/context/Web3Modal";

const vt323 = VT323({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RampX registration - The future awaits.",
  description:
    "Simplifying crypto onboarding by building the first █ ████ ██. Backed & powered by @SeiNetwork",
  icons: {
    icon: "/assets/icons/rampx-favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

      <body className={vt323.className}>
        <Web3Modal>{children}</Web3Modal>
        <Toaster
          position="bottom-right"
          // richColors
          toastOptions={{
            classNames: {
              error: "bg-black border border-red-600 text-red-600 font-VT323",
              success: "bg-black border border-a-fluo text-a-fluo font-VT323",
              warning: "text-yellow-400",
              info: "bg-blue-400",
            },
          }}
        />
      </body>
    </html>
  );
}
