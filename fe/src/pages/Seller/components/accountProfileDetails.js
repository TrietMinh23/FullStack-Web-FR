import React, { useState, useCallback, useEffect } from "react";
import PopUpSucess from "../../Home/PersonalProfile/components/Popup/PopUpSucess";
import PopUpFail from "../../Home/PersonalProfile/components/Popup/PopUpFail";
import PopUpSame from "../../Home/PersonalProfile/components/Popup/PopUpSame";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  InputLabel,
  Typography,
  Snackbar,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { updateSellerById } from "../../../api/seller";
import { ValidationEmail } from "../../../utils/Validation";

const states = [
  {
    value: "america",
    label: "America",
  },
  {
    value: "france",
    label: "France",
  },
  {
    value: "italy",
    label: "Italy",
  },
  {
    value: "germany",
    label: "Germany",
  },
  {
    value: "vietnam",
    label: "Việt Nam",
  },
];

export const AccountProfileDetails = ({ name, email, mobile, address }) => {
  const [isFalse, setIsFalse] = useState(false);
  const [isTrue, setIsTrue] = useState(false);
  const [isSame, setIsSame] = useState(false);
  const [isNull, setIsNull] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "vietnam",
    country: "",
  });

  const firstdata = {
    name: name,
    email: email,
    address: address,
    mobile:  mobile,
  };

  const closeSame = () => {
    setIsSame(false);

  };

  const closeSee = () => {
    setIsFalse(false);
    setIsTrue(false);
    setIsSame(false);
    window.location.reload();
  };

  const [unchangedDataNotification, setUnchangedDataNotification] =
    useState(true);
  const [missingFieldNotification, setMissingFieldNotification] = useState(false);

  useEffect(() => {
    if (name) {
      const nameParts = name.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ");

      setValues({
        firstName,
        lastName,
        email: email || "",
        phone: mobile || "",
        state: "vietnam",
        country: address || "",
      });
    }
  }, [name, email, mobile, address]);

  const formattedValues = {
    name: `${values.firstName} ${values.lastName}`,
    email: values.email,
    address: values.country,
    mobile: values.phone,
  };

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setUnchangedDataNotification(false);
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (event) => {
    setIsSubmit(true);
    event.preventDefault();
    
    let buyerId = localStorage.getItem("_id");
    let cleanedBuyerId = buyerId.replace(/"/g, "");
    const id = cleanedBuyerId;
   
    if(values.lastName && values.firstName && ValidationEmail(values.email) && values.phone && values.state && values.country){
      if(JSON.stringify(firstdata) == JSON.stringify(formattedValues)){
        setIsSame(true);
      } else{
        try {
          // Make an API call to update the buyer's details
          const response = await updateSellerById(id, formattedValues); // Use formattedValues here
          console.log("Updated buyer: ", response.data);
          setIsTrue(true);
          // Handle success, show a success message or take other actions
        } catch (error) {
          setIsFalse(true);
          // Handle error, show an error message or take other actions
          console.log("Failed to update buyer: ", error);
        }
      }
    }
  };

  return (
    <>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Card className="px-6 py-4 shadow-lg">
          <CardHeader
            subheader="The information can be edited"
            title="Profile"
          />
          <CardContent>
            <Box className="space-y-4">
              <Grid container spacing={4}>
                <Grid xs={12} md={6}>
                  <InputLabel>First name</InputLabel>
                  <TextField
                    fullWidth
                    name="firstName"
                    onChange={handleChange}
                    required
                    value={values.firstName}
                    variant="outlined"
                  />
                   <div
                      className={` ${
                        isSubmit && !values.firstName 
                          ? "text-red-700 visible font-semibold"
                          : "invisible"
                      }`}
                    >
                      !This field can't be empty
                    </div>
                </Grid>
                <Grid xs={12} md={6}>
                  <InputLabel>Last name</InputLabel>
                  <TextField
                    fullWidth
                    name="lastName"
                    onChange={handleChange}
                    required
                    value={values.lastName}
                    variant="outlined"
                  />
                   <div
                      className={` ${
                        isSubmit && !values.lastName
                          ? "text-red-700 visible font-semibold"
                          : "invisible"
                      }`}
                    >
                      !This field can't be empty
                    </div>
                </Grid>
                <Grid xs={12} md={6}>
                  <InputLabel>Email Address</InputLabel>
                  <TextField
                    fullWidth
                    name="email"
                    onChange={handleChange}
                    required
                    value={values.email}
                    variant="outlined"
                  />
                    <div
                      className={` ${
                        isSubmit && !ValidationEmail(values.email)
                          ? "text-red-700 visible font-semibold"
                          : "invisible"
                      }`}
                    >
                       {!(values.email) ? "This field can't be empty" :"!Wrong format"}
                    </div>
                </Grid>
                <Grid xs={12} md={6}>
                  <InputLabel>Phone Number</InputLabel>
                  <TextField
                    fullWidth
                    name="phone"
                    onChange={handleChange}
                    type="number"
                    value={values.phone}
                    variant="outlined"
                  />
                   <div
                      className={` ${
                        isSubmit && !values.phone
                          ? "text-red-700 visible font-semibold"
                          : "invisible"
                      }`}
                    >
                      !This field can't be empty
                    </div>
                </Grid>
                <Grid xs={12} md={6}>
                  <InputLabel>Address</InputLabel>
                  <TextField
                    fullWidth
                    name="country"
                    onChange={handleChange}
                    required
                    value={values.country}
                    variant="outlined"
                  />
                   <div
                      className={` ${
                        isSubmit && !values.country
                          ? "text-red-700 visible font-semibold"
                          : "invisible"
                      }`}
                    >
                      This field can't be empty
                    </div>
                </Grid>
                <Grid xs={12} md={6}>
                  <InputLabel>Select Country</InputLabel>
                  <TextField
                    fullWidth
                    name="state"
                    onChange={handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    value={values.state}
                    variant="outlined"
                  >
                    
                    {states.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions className="flex justify-end p-4">
            <Button
              type="submit"
              variant="contained"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
            >
              Save Detail
            </Button>
          </CardActions>
        </Card>
      </form>
      {isTrue && (
        <div className="flex lg:flex-row flex-col">
          <PopUpSucess
            close={closeSee}
            at={document.documentElement.scrollTop}
          />
          <div id="dimScreen" className={"block"}></div>
        </div>
      )}
      {isFalse && (
        <div className="flex lg:flex-row flex-col">
          <PopUpFail close={closeSee} at={document.documentElement.scrollTop} />
          <div id="dimScreen" className={"block"}></div>
        </div>
      )}
      {isSame && (
        <div className="flex lg:flex-row flex-col">
          <PopUpSame
            close={closeSame}
            at={document.documentElement.scrollTop}
          />
          <div id="dimScreen" className={"block"}></div>
        </div>
      )}
      {isSame && (
        <div className="flex lg:flex-row flex-col">
          <PopUpSame
            close={closeSame}
            at={document.documentElement.scrollTop}
          />
          <div id="dimScreen" className={"block"}></div>
        </div>
      )}
    </>
  );
};
