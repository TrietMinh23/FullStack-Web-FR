import React, { useState } from "react";
import Select from "react-tailwindcss-select";

const options = [
  { value: "fox", label: "🦊 Fox" },
  { value: "Butterfly", label: "🦋 Butterfly" },
  { value: "Honeybee", label: "🐝 Honeybee" },
];

const Form = ({ title }) => (
  <div className="mb-4">
    <label htmlFor={title} className="mb-2 self-start capitalize">
      {title} :
    </label>
    <input
      type="text"
      id={title}
      className="py-2 px-3 border focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
      required
    />
  </div>
);

const NewProductForm = () => {
  const [animal, setAnimal] = useState(null);

  const handleChange = (value) => {
    setAnimal(value);
  };
  return (
    <div class="container mx-auto flex flex-col justify-center items-center max-w-4xl">
      <h1 className="text-2xl font-bold mb-4 block w-full text-left">
        New Product
      </h1>
      <div className="w-full">
        <form>
          <Form title="title" PH="Give the target a name"></Form>
          <Form title="price" PH="Please enter your price"></Form>
          <div className="mb-4 flex flex-col">
            <label htmlFor="description" className="mb-2 self-start">
              Description :
            </label>
            <textarea
              id="description"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Give us some descriptions about your product"
            ></textarea>
          </div>
          <Form title="brand" PH="Please enter your brand name"></Form>
          <div className="mb-4">
            <label htmlFor="type" className="mb-2 self-start">
              Category :
            </label>
            <Select
              id="type"
              value={animal}
              onChange={handleChange}
              options={options}
              isMultiple={true}
            />
          </div>
          <Form title="condition" PH="Guess how new your items are"></Form>
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
