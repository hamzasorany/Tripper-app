import React from "react";
import TextField from "@mui/material/TextField";
type inputTextProps = {
  label: string;
  type: "text" | "email";
  value: string;
  setValue: (newValue: string) => void;
};
const InputText = ({ label, type, value, setValue }: inputTextProps) => {
  return (
    <>
      <TextField
        label={label}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{
          display: "block",
          "& .MuiOutlinedInput-root": {
            borderRadius: "1rem",
            boxShadow: 1,
            width: "100%",
          },
          width: "80%",
        }}
      />
    </>
  );
};

export default InputText;
