import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductDescription from "@/container/ProductShowcase/ProductDiscription";
import ProductShowcase from "@/container/ProductShowcase/ProductShowcase";

interface ProductDetailPageProps {
  params?: { id: string | string[] }; // optional & can be string[]
  searchParams?: Record<string, string | string[]>; // optional
}

export default async function ProductDetailPage({
  params,
  searchParams,
}: ProductDetailPageProps) {
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  if (!id) {
    return <p className="text-red-500">Product ID not provided</p>;
  }

  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <p className="text-red-500">Failed to load product</p>;
  }

  const product = await res.json();

  const mappedProduct = {
    id: product.id,
    name: product.title,
    price: product.price,
    description: product.description,
    images: [product.image],
    rating: product.rating?.rate ?? 0,
    reviewsCount: product.rating?.count ?? 0,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#ffffff", "#ff0000"],
  };

  return (
    <div>
      <Header />
      <ProductShowcase product={mappedProduct} />
      <ProductDescription />
      <Footer />
    </div>
  );
}
