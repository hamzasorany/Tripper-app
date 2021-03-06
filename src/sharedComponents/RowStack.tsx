import React from "react";
import Stack from "@mui/material/Stack";
type rowStackProps = {
  children: React.ReactElement;
  onClick: () => void;
  closeDrawer: () => void;
};
const RowStack = ({ children, onClick, closeDrawer }: rowStackProps) => {
  return (
    <Stack
      sx={{
        my: 1,
        mx: 1,

        "&:hover": {
          cursor: "pointer",
        },
      }}
      direction={"row"}
      alignItems="center"
      justifyContent={"start"}
      spacing={1}
      onClick={() => {
        onClick();
        closeDrawer();
      }}
    >
      {children}
    </Stack>
  );
};
export default RowStack;
