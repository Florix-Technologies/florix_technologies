import { Metadata } from "next";
import RequestQuoteClient from "./request-quote-client";

export const metadata: Metadata = {
    title: "Request a Quote | Florix Technologies",
    description: "Request a custom quote for your IT needs. Florix Technologies offers competitive pricing for PC builds, IT support, and web development.",
    openGraph: {
        title: "Request a Quote | Florix Technologies",
        description: "Request a custom quote for your IT needs. Florix Technologies offers competitive pricing for PC builds, IT support, and web development.",
        url: "https://florixtechnologies.com/request-quote",
        siteName: "Florix Technologies",
        locale: "en_US",
        type: "website",
    }
};

export default function RequestQuotePage() {
    return <RequestQuoteClient />;
}
