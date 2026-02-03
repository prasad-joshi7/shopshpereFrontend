import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddDeliveryAddressForm from "./AddAddress";
import { useLocation, useNavigate } from "react-router-dom";
import OrderSummary from "./OrderSummary";

const steps = [
  "Login",
  "Delivery Address",
  "Order Summary",
  "Payment",
];

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  // STEP COMES ONLY FROM URL
  const step = Number(new URLSearchParams(location.search).get("step")) || 2;

  const handleNext = () => {
    navigate(`/checkout?step=${step + 1}`);
  };

  const handleBack = () => {
    navigate(`/checkout?step=${step - 1}`);
  };

  return (
    <Box className="px-5 lg:px-32" sx={{ width: "100%" }}>
      {/* STEPPER */}
      <Stepper activeStep={step - 1}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* BACK BUTTON */}
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={step <= 1}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
      </Box>

      {/* STEP CONTENT */}
      <div className="my-5">
        {step === 2 && <AddDeliveryAddressForm handleNext={handleNext} />}
        {step === 3 && <OrderSummary />}
        {step === 4 && (
          <Typography variant="h6" sx={{ mt: 3 }}>
            Payment Step (Coming Soon)
          </Typography>
        )}
      </div>
    </Box>
  );
}