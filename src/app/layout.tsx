import { Work_Sans } from "next/font/google";
import "../styles/global.css";

const workSans = Work_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${workSans.className} bg-primary text-white`}>
        {children}
      </body>
    </html>
  );
}
