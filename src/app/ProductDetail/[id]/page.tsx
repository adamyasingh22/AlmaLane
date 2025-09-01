import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductDescription from "@/container/ProductShowcase/ProductDiscription";
import ProductShowcase from "@/container/ProductShowcase/ProductShowcase";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`, {
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
    sizes: ["S", "M", "L", "XL"], // since fakestore has no size data
    colors: ["#000000", "#ffffff", "#ff0000"], // colors
  };
    return (
        <div>
            <Header/>
            <ProductShowcase product={mappedProduct}/>
            <ProductDescription/>
            <Footer/>
        </div>
    )
}