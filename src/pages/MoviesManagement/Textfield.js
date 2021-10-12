import React from "react";
import TextField from "@mui/material/TextField";
import { useField } from "formik";
const TextfieldWrapper = ({ name, ...otherProps }) => {
  const [field, mata] = useField(name);
  const configTextField = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
  };
  if (mata && mata.touched && mata.error) {
    configTextField.error = true;
    configTextField.helpText = mata.error;
  }
  return <TextField {...configTextField} />;
};

export default TextfieldWrapper;
