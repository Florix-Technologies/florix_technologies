import { Metadata } from "next";
import CloudClient from "./cloud-client";

export const metadata: Metadata = {
  title: "Cloud Services | Florix Technologies",
  description: "Cloud adoption, migration, DevOps, security, and cost optimization by Florix Technologies. AWS, Azure, GCP, ServiceNow, and hybrid cloud experts.",
  openGraph: {
    title: "Cloud Services | Florix Technologies",
    description: "Cloud adoption, migration, DevOps, security, and cost optimization by Florix Technologies. AWS, Azure, GCP, ServiceNow, and hybrid cloud experts.",
    url: "https://florixtechnologies.com/services/cloud",
    siteName: "Florix Technologies",
    locale: "en_US",
    type: "website",
  }
};

export default function CloudPage() {
  return <CloudClient />;
}
