'use client'
import Banner from "./banner";
import BigSavingDays from "./BigSavingDays";
import BrandDeals from "./BrandDeals";
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
      <CategoriesMen heading="Categories For Him"/>
      <CategoriesMen heading="Categories For Her"/>
      <BrandDeals/>
    </div>
  );
};