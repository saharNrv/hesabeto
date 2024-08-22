import "./globals.css";
import { CultureProvider } from "../../context/CultureProvider";
import ClientOnly from "@/components/client_only/ClientOnly";
import { AuthorizationProvider } from "../../context/AuthorizationProvider";

export const metadata = {
  title: "Hesabeto",
  description: "Your accounting software",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["Hesabeto", "Accountin Application"],
  icons: [
    { rel: "apple-touch-icon", url: "icon512x512.png" },
    { rel: "icon", url: "icon512x512.png" },
  ],
};

// Export themeColor separately
// export const themeColor = [
//   { media: "(prefers-color-scheme: dark)", color: "#fff" },
// ];

// Export viewport separately
export const viewport = {
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
};

interface PropsDTO {
  children: React.ReactNode
}
export default function RootLayout({ children }:PropsDTO) {
  return (
    <html lang="fa">
      <head>
        <title>Hesabeto</title>
        <meta name="description" content={metadata.description} />
        <meta name="generator" content={metadata.generator} />
        <link rel="manifest" href={metadata.manifest} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />
        {metadata.icons.map(({ rel, url }, index) => (
          <link key={index} rel={rel} href={url} />
        ))}
      </head>
      <body>
        <ClientOnly>
          <AuthorizationProvider>
            <CultureProvider>{children}</CultureProvider>
          </AuthorizationProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
