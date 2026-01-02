import { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Us | Florix Technologies - Bengaluru",
  description: "Get in touch with Florix Technologies in JP Nagar, Bengaluru. Contact us for IT support, PC building, or web development inquiries.",
  openGraph: {
    title: "Contact Us | Florix Technologies - Bengaluru",
    description: "Get in touch with Florix Technologies in JP Nagar, Bengaluru. Contact us for IT support, PC building, or web development inquiries.",
    url: "https://florixtechnologies.com/contact",
    siteName: "Florix Technologies",
    locale: "en_US",
    type: "website",
  }
};

export default function ContactPage() {
  return <ContactClient />;
}
