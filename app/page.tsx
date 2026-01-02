import { Metadata } from "next";
import HomeClient from "@/components/home-client";

export const metadata: Metadata = {
  title: "Florix Technologies | Advanced IT Solutions & PC Building",
  description: "Florix Technologies provides comprehensive IT solutions including web development, IT support, AI integration, and custom PC building. Trusted by 91+ clients worldwide.",
  openGraph: {
    title: "Florix Technologies | Advanced IT Solutions & PC Building",
    description: "Florix Technologies provides comprehensive IT solutions including web development, IT support, AI integration, and custom PC building. Trusted by 91+ clients worldwide.",
    url: "https://florixtechnologies.com",
    siteName: "Florix Technologies",
    locale: "en_US",
    type: "website",
  }
};

export default function Home() {
  return <HomeClient />;
}
