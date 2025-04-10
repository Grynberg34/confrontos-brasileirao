import type { Metadata } from "next";
import Provider from "@/store/provider";
import "../styles/global.scss";

export const metadata: Metadata = {
  title: "Confrontos Corridos",
  description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}