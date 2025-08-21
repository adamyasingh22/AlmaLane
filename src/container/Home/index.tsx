'use client'
import CarouselHome from "./carousel";
import Deals from "./deals";
import NewArrivals from "./newarrivals";




export default function Homecontainer() {
  return (
    <div>
      <CarouselHome/>
      <Deals/>
      <NewArrivals/>
    </div>
  );
};