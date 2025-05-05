import type { Metadata } from "next";
import Provider from "@/store/provider";
import "../styles/global.scss";

export const metadata: Metadata = {
  title: "Confrontos Corridos",
  description:
    "Uma aplicação web desenvolvida com React, Redux, Next.js e TypeScript que oferece dados e insights completos sobre o Campeonato Brasileiro durante a era de pontos corridos (2003–2025). Os usuários podem explorar confrontos diretos, classificações, campanhas dos times e recordes coletivos com opções avançadas de filtragem, ordenação e visualização.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXV7JF8Z8K"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXV7JF8Z8K');
            `,
          }}
        ></script>
      </head>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}