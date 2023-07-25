import React, { useState } from 'react';

const NewProductForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [discount, setDiscount] = useState('');
  const [visibility, setVisibility] = useState('public');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title,
      price,
      description,
      brand,
      category,
      discount,
      visibility,
    };
    onSubmit(formData); // Gửi dữ liệu form đến component cha
    setTitle('');
    setPrice('');
    setDescription('');
    setBrand('');
    setCategory('');
    setDiscount('');
    setVisibility('public');
    console.log('Submitted!');
  };

  return (
    <div class="container mx-auto flex flex-col justify-center items-center mt-5 ">
      <h1 className="text-2xl font-bold mb-4">New Product</h1>
      <div className='max-w-3xl w-full'>
      <form onSubmit={handleSubmit} className="grid grid-cols-[auto,1fr] gap-4 border rounded p-6">
        <label htmlFor="title" className="mb-2 self-start">
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
          required
        />

        <label htmlFor="price" className="mb-2 self-start">
          Price:
        </label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
          required
        />

        <label htmlFor="description" className="mb-2 self-start">
          Description:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
          required
        ></textarea>

        <label htmlFor="brand" className="mb-2 self-start">
          Brand:
        </label>
        <input
          type="text"
          id="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
          required
        />

        <label htmlFor="category" className="mb-2 self-start">
          Category:
        </label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
          required
        />

        <label htmlFor="discount" className="mb-2 self-start">
          Discount:
        </label>
        <input
          type="text"
          id="discount"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        />

        <label className="mb-2 self-start">Visibility:</label>
        <div className="flex items-center">
          <label htmlFor="public" className="mr-4">
            <input
              type="radio"
              id="public"
              value="public"
              checked={visibility === 'public'}
              onChange={(e) => setVisibility(e.target.value)}
              className="mr-1"
            />
            Public
          </label>
          <label htmlFor="partially-public" className="mr-4">
            <input
              type="radio"
              id="partially-public"
              value="partially-public"
              checked={visibility === 'partially-public'}
              onChange={(e) => setVisibility(e.target.value)}
              className="mr-1"
            />
            Partially Public
          </label>
          <label htmlFor="private" className="mr-4">
            <input
              type="radio"
              id="private"
              value="private"
              checked={visibility === 'private'}
              onChange={(e) => setVisibility(e.target.value)}
              className="mr-1"
            />
            Private
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
      </div>
      
    </div>
  );
};

export default NewProductForm;