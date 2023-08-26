import React, { useState } from "react";
import Select from "react-tailwindcss-select";
import { useEffect } from "react";
import { rows } from "../data/dataTable";
import { ProductID, createProduct, updateProduct } from "../../../api/products";
import { getByCategoryRelative } from "../../../api/category";
import { MultiSelect } from "react-multi-select-component";

let options = [];

const Form = ({ title, PH, value }) => (
  <div className="mb-4">
    <label htmlFor={title} className="mb-2 self-start capitalize">
      {title} :
    </label>
    <input
      type="text"
      id={title}
      className="py-2 px-3 border focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
      placeholder={PH}
      defaultValue={value || ""}
      required
    />
  </div>
);

const NewProductForm = ({ tradeCode, role }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [productData, setProductData] = useState(null);
  const [category, setCategory] = useState(null);
  const [roleUser, setRoleUser] = useState(role);

  const handleChange = (selected) => {
    if (selected === null || selected === undefined) {
      return;
    }
    setSelectedOptions(selected);
    const newCategory = selected.map((item) => item.value);
    setCategory(newCategory);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", e.target.title.value);
    formData.append("description", e.target.description.value);
    formData.append("price", e.target.price.value);
    formData.append("brandName", e.target.brand.value);
    if (imageFile instanceof File) {
      console.log(1);
      formData.append("image", imageFile); // Thêm hình ảnh mới vào formData nếu có sự thay đổi
    } else {
      console.log(2);
      formData.append("image", productData.image); // Sử dụng hình ảnh hiện tại nếu không có sự thay đổi
    }
    formData.append("color", e.target.color.value);
    formData.append("condition", e.target.condition.value);
    category.forEach((items) => {
      formData.append("category", items);
    });

    // Get the sellerId value from local storage
    const sellerId = localStorage.getItem("_id");
    // Remove the extra quotes if present
    const cleanedSellerId = sellerId.replace(/"/g, "");

    // Append the cleaned sellerId to the formData
    formData.append("sellerId", cleanedSellerId);

    try {
      if (tradeCode) {
        // Update product if tradeCode is available
        const response = await updateProduct(tradeCode, formData);
        console.log("Product updated:", response);
      } else {
        // Create new product if tradeCode is not available
        const response = await createProduct(formData);
        console.log("Product created:", response);
      }
      if (roleUser === "seller") {
        window.location.href = "http://localhost:3000/seller/all-item";
      } else {
        window.location.href =
          "http://localhost:3000/admin/usemanagement/allitems";
      }
    } catch (error) {
      console.error("Error creating product:", error.message);
    }
  };

  const getCategory = async () => {
    await getByCategoryRelative()
      .then((res) => {
        res.data.forEach((item) => {
          options.push({
            value: item.title,
            label: item.title,
          });
        });
        sessionStorage.setItem("listCategory", JSON.stringify(options));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (tradeCode) {
      // Fetch product details based on the tradeCode
      const fetchProductDetails = async () => {
        try {
          const response = await ProductID(tradeCode);
          const product = response.data;
          setProductData(product);
        } catch (error) {
          console.error("Error fetching product details:", error.message);
        }
      };

      fetchProductDetails();
    }
  }, [tradeCode]);

  useEffect(() => {
    if (productData) {
      const selected = options.filter((option) =>
        productData.category.includes(option.value)
      );
      setSelectedOptions(selected);
    }
  }, [productData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  useEffect(() => {
    if (imageFile) {
      const newSrc = URL.createObjectURL(imageFile);
      const imageElement = document.getElementsByClassName("show-image")[0];
      if (imageElement) {
        imageElement.src = newSrc;
      }
    }
  }, [imageFile]);

  useEffect(() => {
    if (!sessionStorage.getItem("listCategory")) {
      getCategory();
    }
  }, []);

  return (
    <div className="container mx-auto flex flex-col justify-center items-center max-w-4xl">
      <h1 className="text-2xl font-bold mb-4 block w-full text-left">
        {tradeCode ? "Update Product" : "New Product"}
      </h1>
      <div className="w-full">
        <form onSubmit={handleSubmit}>
          <Form
            title="title"
            PH="Give the target a name"
            value={productData?.title}
          ></Form>
          <Form
            title="price"
            PH="Please enter your price"
            value={productData?.price}
          ></Form>
          <div className="mb-4 flex flex-col">
            <label htmlFor="description" className="mb-2 self-start">
              Description :
            </label>
            <textarea
              id="description"
              className="py-2 px-3 border focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
              placeholder="Give us some descriptions about your product"
              defaultValue={productData?.description}
            ></textarea>
          </div>
          <Form
            title="brand"
            PH="Please enter your brand name"
            value={productData?.brandName}
          ></Form>
          <Form
            title="color"
            PH="Please enter your color"
            value={productData?.color}
          ></Form>
          <div className="mb-4">
            <label htmlFor="type" className="mb-2 self-start">
              Category :
            </label>
            <MultiSelect
              options={JSON.parse(sessionStorage.getItem("listCategory"))}
              value={selectedOptions}
              onChange={handleChange}
              id="type"
            />
          </div>
          <Form
            title="condition"
            PH="Guess how new your items are"
            value={productData?.condition}
          ></Form>
          <div className="mb-4">
            <label htmlFor="image" className="mb-2 self-start capitalize">
              Image :
            </label>
            {(productData?.image || imageFile) && (
              <div className="mb-2">
                <img
                  src={
                    imageFile
                      ? URL.createObjectURL(imageFile)
                      : productData?.image
                  } // Assuming 'productData.image' contains the URL of the existing image
                  alt="Product"
                  className="show-image max-h-40 mb-2"
                />
              </div>
            )}
            <input
              type="file"
              id="image"
              className="py-2 px-3 border focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
              onChange={handleImageChange}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {tradeCode ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProductForm;
