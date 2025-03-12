import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItems from "./ProductItems";


const RelatedProducts = ({category,subCategory}) => {
    const {products}= useContext(ShopContext)
    const [relatedProduct,setRelatedProduct]=useState([])
    
    useEffect(()=>{
      console.log("RelatedProducts received:", { category, subCategory });
        if(products.length>0){
            console.log("phan loai",category,subCategory) 
          let productCopy = products.slice()
          productCopy= products.filter(item=>category===item.category)
          productCopy = products.filter((item) => subCategory === item.subCategory);
         setRelatedProduct(productCopy.slice(0,5))
        }
    },[])
    return (
      <div className="my-24">
        <div className=" text-center text-3xl py-2">
          <Title text1={"RELATED "} text2={"PRODUCTS"} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {relatedProduct.map((item, index) => (
            <ProductItems
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    );
}

export default RelatedProducts
