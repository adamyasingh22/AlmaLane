'use client'
import Banner from "./banner";
import BigSavingDays from "./BigSavingDays";
import CarouselHome from "./carousel";
import CategoriesMen from "./CategoriesMan";
import Deals from "./deals";
import NewArrivals from "./newarrivals";




export default function Homecontainer() {
  return (
    <div>
      <CarouselHome/>
      <Deals/>
      <NewArrivals/>
      <BigSavingDays/>
      <Banner/>
      <CategoriesMen/>
    </div>
  );
};