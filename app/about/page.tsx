import { Metadata } from "next";
import AboutClient from "./about-client";

export const metadata: Metadata = {
  title: "About Us | Florix Technologies",
  description: "Learn about Florix Technologies' mission to empower progress through unified IT solutions. We combine expert PC building, IT support, and web development.",
  openGraph: {
    title: "About Us | Florix Technologies",
    description: "Learn about Florix Technologies' mission to empower progress through unified IT solutions. We combine expert PC building, IT support, and web development.",
    url: "https://florixtechnologies.com/about",
    siteName: "Florix Technologies",
    locale: "en_US",
    type: "website",
  }
};

export default function AboutPage() {
  return <AboutClient />;
}
