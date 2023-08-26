import React, { useState, useCallback, useEffect } from "react";
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
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "vietnam",
    country: "",
  });

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
    event.preventDefault();

    // Check for missing required fields
    if (!values.firstName || !values.lastName || !values.email || !values.country || !values.phone || !values.address) {
      window.alert("Please fill in all required fields.");
      setMissingFieldNotification(false);
      return;
    }

    let sellerId = localStorage.getItem("_id");
    let cleanedSellerId = sellerId.replace(/"/g, "");
    const id = cleanedSellerId;

    // Check if the data is unchanged
    if (unchangedDataNotification) {
      window.alert("No changes to save.");
      setUnchangedDataNotification(true);
      return;
    }

    try {
      setUnchangedDataNotification(true);
      // Make an API call to update the seller's details
      const response = await updateSellerById(id, formattedValues); // Use formattedValues here
      console.log("Updated seller: ", response.data);
      // Handle success, show a success message or take other actions
      window.alert("Updated seller successfully!");
      window.location.reload();
    } catch (error) {
      // Handle error, show an error message or take other actions
      window.alert("Failed to update seller!");
      console.log("Failed to update seller: ", error);
    }
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card className="px-6 py-4 shadow-lg">
        <CardHeader
          subheader="The information can be edited"
          title={
            <Typography variant="h5" component="div" fontWeight="bold">
              Profile
            </Typography>
          }
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
  );
};
