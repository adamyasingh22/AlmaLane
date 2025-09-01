import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CartContainer from "@/container/AddToCart/CartContainer";
import Navigation from "@/container/AddToCart/Navigation";

export default function Cart (){
    return (
        <>
         <Header/>
         <Navigation/>
         <CartContainer/>
         <Footer/>
        </>
    )
}