import React, { useState, useEffect } from "react";
import { AccountProfileDetails } from "../components/accountProfileDetails";
import { AccountProfile } from "../../../Seller/components/accountProfile";

import {getBuyerById} from "../../../../api/buyer";
export default function Profile () {
    const [buyer, setBuyer] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const buyerId = localStorage.getItem("_id").replace(/"/g, "");
        if(buyerId) fetchBuyer(buyerId);
      }, []);
    async function fetchBuyer(id) {
        try {
          const response = await getBuyerById(id);
          setBuyer(response.data);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
    }
    useEffect(() => {
        console.log("data",buyer);
      }, [buyer]);

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
        <div className="xl:ml-64 ml-0 p-4 mt-[-100vh]" id="info">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2 ml-3">
                Your Profile
            </h1>
            <div className="flex flex-wrap justify-between">
                <div className="w-full md:w-1/4 p-4">
                <AccountProfile
                    name={buyer.name}
                    email={buyer.email}
                    mobile={buyer.mobile}
                />
                </div>
                <div className="w-full md:w-3/4 p-4">
                <AccountProfileDetails
                    name={buyer.name}
                    email={buyer.email}
                    mobile={buyer.mobile}
                    address={buyer.address}
                />
                </div>
            </div>
        </div>
    )
}

