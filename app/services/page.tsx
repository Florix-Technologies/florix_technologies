import { Metadata } from "next";
import ServicesClient from "./services-client";

export const metadata: Metadata = {
  title: "IT Services - Web Development, IT Support & PC Building | Florix Technologies",
  description: "Explore Florix Technologies' services: Web Development, IT Support, Custom PC Building, AMC, and more. We provide end-to-end IT solutions.",
  openGraph: {
    title: "IT Services - Web Development, IT Support & PC Building | Florix Technologies",
    description: "Explore Florix Technologies' services: Web Development, IT Support, Custom PC Building, AMC, and more. We provide end-to-end IT solutions.",
    url: "https://florixtechnologies.com/services",
    siteName: "Florix Technologies",
    locale: "en_US",
    type: "website",
  }
};

export default function ServicesPage() {
  return <ServicesClient />;
}
