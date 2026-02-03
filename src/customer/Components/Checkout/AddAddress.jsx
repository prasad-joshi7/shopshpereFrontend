import * as React from "react";
import { Grid, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../Redux/Customers/Order/Action";
import AddressCard from "../adreess/AdreessCard";
import { useState } from "react";

export default function AddDeliveryAddressForm({ handleNext }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  const [selectedAddress, setSelectedAddress] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phoneNumber: "",
  });

  // ✅ SELECT SAVED ADDRESS
  const handleSelectAddress = (item) => {
    setSelectedAddress(item);
    setFormData({
      firstName: item.firstName || "",
      lastName: item.lastName || "",
      address: item.streetAddress || "",
      city: item.city || "",
      state: item.state || "",
      zip: item.zipCode || "",
      phoneNumber: item.mobile || "",
    });
  };

  // ✅ CREATE ORDER FROM FORM
  const handleSubmit = (e) => {
    e.preventDefault();

    const address = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      streetAddress: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zip,
      mobile: formData.phoneNumber,
    };

    dispatch(createOrder({ address, jwt, navigate }));
    handleNext();
  };

  // ✅ CREATE ORDER FROM SAVED ADDRESS (FIXED)
  const handleCreateOrder = (item, e) => {
    e.stopPropagation(); // 🔥 IMPORTANT

    const address = {
      firstName: item.firstName,
      lastName: item.lastName,
      streetAddress: item.streetAddress,
      city: item.city,
      state: item.state,
      zipCode: item.zipCode,
      mobile: item.mobile,
    };

    dispatch(createOrder({ address, jwt, navigate }));
    handleNext();
  };

  return (
    <Grid container spacing={4}>
      {/* LEFT: SAVED ADDRESSES */}
      <Grid item xs={12} lg={5}>
        <Box className="border rounded-md shadow-md h-[30.5rem] overflow-y-scroll">
          {auth.user?.addresses?.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelectAddress(item)}
              className="p-5 py-7 border-b cursor-pointer"
            >
              <AddressCard address={item} />

              {selectedAddress?.id === item.id && (
                <Button
                  sx={{ mt: 2 }}
                  variant="contained"
                  color="primary"
                  onClick={(e) => handleCreateOrder(item, e)}
                >
                  Delivered Here
                </Button>
              )}
            </div>
          ))}
        </Box>
      </Grid>

      {/* RIGHT: ADDRESS FORM */}
      <Grid item xs={12} lg={7}>
        <Box className="border rounded-md shadow-md p-5">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  fullWidth
                  required
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  fullWidth
                  required
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Address"
                  fullWidth
                  multiline
                  rows={4}
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  fullWidth
                  required
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="State / Province"
                  fullWidth
                  required
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Zip / Postal Code"
                  fullWidth
                  required
                  value={formData.zip}
                  onChange={(e) =>
                    setFormData({ ...formData, zip: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number"
                  fullWidth
                  required
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phoneNumber: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  color="primary"
                  sx={{ padding: ".9rem 1.5rem" }}
                >
                  Delivered Here
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
