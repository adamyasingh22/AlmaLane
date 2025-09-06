import Header from "@/components/Header";
import ProductsPage from "./ProductsPage";
import Footer from "@/components/Footer";

export default function ProductPage({ searchParams }: { searchParams?: { category?: string } }) {
  return (
    <>
      <Header />
      <ProductsPage searchParams={searchParams ?? {}} /> 
      <Footer/>
    </>
  );
}
