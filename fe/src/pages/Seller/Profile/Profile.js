import React, { useState, useEffect } from "react";
import { AccountProfileDetails } from "../components/accountProfileDetails";
import { getSellerById } from "../../../api/seller";
import { AccountProfile } from "../components/accountProfile";

export default function Profile() {
  const [seller, setSeller] = useState({});
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sellerId = localStorage.getItem("_id").replace(/"/g, "");
    setId(sellerId);
  }, []);

  useEffect(() => {
    if (!id) return;

    async function fetchSeller() {
      try {
        const response = await getSellerById(id);
        setSeller(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSeller();
  }, [id]);

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-8 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-2 ml-3">
        Your Profile
      </h1>
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/4 p-4">
          <AccountProfile
            name={seller.name}
            email={seller.email}
            mobile={seller.mobile}
          />
        </div>
        <div className="w-full md:w-3/4 p-4">
          <AccountProfileDetails
            name={seller.name}
            email={seller.email}
            mobile={seller.mobile}
            address={seller.address}
          />
        </div>
      </div>
    </div>
  );
}
