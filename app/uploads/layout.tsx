import Navbar from "@/app/uploads/components/Navbar";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dribbble -  Discover the World's Top Developers & Tech Professionals",
  description:
    "Find Top Developers & Tech Professionals on Dribbble. We are where developers gain insights, code reviews, community, and job opportunities. Your best resource to discover and connect with developers worldwide.",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
