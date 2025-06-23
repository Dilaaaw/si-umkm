import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";
import ClientLayout from "@/components/ClientLayout";

export default function PelatihanLayout({ children }) {
  return (
    <ClientLayout>
      {children}
    </ClientLayout>
  );
}
