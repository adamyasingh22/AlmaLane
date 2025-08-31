import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductDescription from "@/container/ProductShowcase/ProductDiscription";
import ProductShowcase from "@/container/ProductShowcase/ProductShowcase";

export default function ProductDetailPage() {
    return (
        <div>
            <Header/>
            <ProductShowcase/>
            <ProductDescription/>
            <Footer/>
        </div>
    )
}