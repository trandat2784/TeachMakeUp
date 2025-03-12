import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import ProductItems from "../component/ProductItems";

const Collection = () => {
  const { products,search,showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [sortType, setSortType] = useState("Relavent");
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  const toggleSubCategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setSubcategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubcategory((prev) => [...prev, e.target.value]);
    }
  };
  const applyFilter = () => {
    let productsCopy = products.slice();
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if(showSearch&&search) {
      productsCopy = productsCopy.filter((item) =>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (subcategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subcategory.includes(item.subCategory)
      );
    }

    setFilterProduct(productsCopy);
  };

  const sortProduct = () => {
    let tempProducts = filterProduct.slice();
    switch (sortType) {
      case "low=high":
        setFilterProduct(tempProducts.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProduct(tempProducts.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break
    }
  };

  useEffect(() => applyFilter(), [category, subcategory, search, showSearch,products]);
  useEffect(() => {
    setFilterProduct(products);
  }, []);
  useEffect(() =>sortProduct(),[sortType])
  // useEffect(() => console.log(category, subcategory), [category, subcategory]);
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* left side filter */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""} `}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        {/* category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          }  sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                onChange={toggleCategory}
                value={"Men"}
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                onChange={toggleCategory}
                value={"Women"}
              />{" "}
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                onChange={toggleCategory}
                value={"Kids"}
              />{" "}
              kids
            </p>
          </div>
        </div>
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Hair and nails"
                onChange={toggleSubCategory}
              />{" "}
              Hair and nails
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Skin"
                onChange={toggleSubCategory}
              />{" "}
              Skin
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Perfume"
                onChange={toggleSubCategory}
              />{" "}
              Perfume
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Outfit"
                onChange={toggleSubCategory}
              />{" "}
              Outfit
            </p>
          </div>
        </div>
      </div>
      {/* right side sort product */}
      <div className="flex-1">
        {/* sort */}
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <div className="inline-flex gap-2 items-center mb-3">
            <p className="text-gray-500">
              ALL <span className="text-gray-700 font-medium">COLLECTIONS</span>
            </p>
            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
          </div>
          {/* <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select> */}
        </div>
        {/* product */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProduct.map((product, index) => {
            console.log(product);
            return (
              <ProductItems
                key={index}
                id={product._id}
                image={product.image}
                name={product.name}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Collection;
