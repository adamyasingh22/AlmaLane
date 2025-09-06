import Header from "@/components/Header";
import ProductsPage from "./ProductsPage";
import Footer from "@/components/Footer";

interface SearchParams {
  category?: string;
}

export default async function ProductPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;

  return (
    <>
      <Header />
      <ProductsPage searchParams={resolvedSearchParams ?? {}} />
      <Footer/>
    </>
  );
}
