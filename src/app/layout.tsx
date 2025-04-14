import type { Metadata } from "next";
import Provider from "@/store/provider";
import "../styles/global.scss";

export const metadata: Metadata = {
  title: "Confrontos Corridos",
  description:
    "Aplicação web desenvolvida com React, Redux, Next.js e TypeScript, que permite comparar o histórico de confrontos entre dois clubes no Campeonato Brasileiro por pontos corridos (de 2003 a 2025). Basta selecionar dois times para visualizar todos os jogos entre eles, além de estatísticas detalhadas como número de vitórias, empates, derrotas, gols marcados, gols sofridos e aproveitamento. Ideal para torcedores, analistas e curiosos por dados do futebol brasileiro.",
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