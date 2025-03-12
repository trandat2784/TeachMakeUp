import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItems from "./ProductItems";

const LastestCollection = () => {
  const { products } = useContext(ShopContext);
  const [lastestProducts ,setLastestProduct] = useState([])
  useEffect(()=>{
  console.log("use",products);

    setLastestProduct(products.slice(0,10))
  },[products])
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3x1">
        <Title text1={"LASTEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil commodi
          obcaecati illo? Veniam inventore quam beatae eaque hic amet numquam
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
            lastestProducts.map((product, index) =>{
                return (<ProductItems key={index} id={product._id} image={product.image} name={product.name} price={product.price} />)
            })
        }
      </div>
    </div>
  );
};

export default LastestCollection;
