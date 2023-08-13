import React from "react";
import ChartOne from "../components/ChartOne";
import Card from "../../Home/PersonalProfile/components/card";
import { AccountProfileDetails } from "../components/account-profile-details";

export default function Profile() {
  return (
    <div>
      <div className="w-full">
        <AccountProfileDetails />
      </div>
    </div>
  );
}
