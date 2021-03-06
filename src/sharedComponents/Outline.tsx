import React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

type outlineProps = { title: string; navigateTo: string };

const Outline = ({ title, navigateTo }: outlineProps) => {
  const navigate = useNavigate();
  return (
    <Stack direction={"row"} alignItems="center" sx={{ my: 1 }}>
      <Typography
        sx={{
          flexGrow: 1,
          fontSize: { xs: "25px", sm: "27Px", md: "30px", lg: "32px" },
          fontWeight: { sx: "defualt", md: "700" },
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
        color={"GrayText"}
        onClick={() => navigate(navigateTo)}
      >
        عرض الكل
      </Typography>
    </Stack>
  );
};

export default Outline;
