import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { mountComment } from "../features/PlaceAddCommentSlice";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import IconTextStack from "./IconTextStack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AvatarGroup from "./AvatarGroup";
import CommentIcon from "@mui/icons-material/Comment";
import StarIcon from "@mui/icons-material/Star";
import Grid from "@mui/material/Grid";
import AddToFavorite from "../sharedComponents/AddToFavorite";
import useAddToFavorite from "../customHooks/useAddToFavorite";

type placeType = {
  props: {
    id: string;
    name: string;
    img: null;
    place_type: string;
    address: string;
    street_address: string;
    city: string;
    country: "الجمهورية العربية السورية";
    comment: number;
    review: null;
    favorites: number;
  };
  onClick: () => void;
};
const PlaceCard = ({ onClick, props }: placeType) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const addCommentHandler = () => {
    dispatch(mountComment());
    navigate(`${pathname}/place/${props.id}`);
  };
  const [addToFavorite, addToFavoriteHandler] = useAddToFavorite();
  return (
    <Stack
      sx={{ boxShadow: 3, pb: 1, borderRadius: ".5rem" }}
      justifyContent={"center"}
      alignItems={"start"}
      spacing={1}
    >
      <Box
        onClick={onClick}
        sx={{
          position: "relative",
          pt: "55%",
          width: "100%",
          borderRadius: ".5rem",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "-webkit-fill-available",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            borderRadius: "inherit",
          }}
          component={"img"}
          src="/images/aleppo.jpg"
        ></Box>

        <IconTextStack left={{ xs: 10, md: 20 }} top={{ xs: 10, md: 20 }}>
          <>
            <LocationOnIcon color="primary" />
            <Typography color={"GrayText"}>{`سورية، ${props.city}`}</Typography>
          </>
        </IconTextStack>
        <AvatarGroup
          right={{ xs: 10, md: 20 }}
          bottom={{ xs: 10, md: 20 }}
          subscribers={[1, 2, 3, 4, 5]}
        >
          <Typography color={"white"}>24/+14</Typography>
        </AvatarGroup>
      </Box>
      <Stack
        sx={{ pl: 1 }}
        justifyContent={"center"}
        alignItems="center"
        direction={"row"}
      >
        <Typography color={"MenuText"}>{props.name}</Typography>
        <Typography color={"GrayText"}>{`(${props.place_type})`}</Typography>
      </Stack>
      <Grid container alignItems={"center"} sx={{ pl: 1 }}>
        <Grid item xs={3}>
          <Stack
            direction={"row"}
            alignItems="center"
            spacing={1}
            onClick={addToFavoriteHandler}
          >
            <AddToFavorite addToFavorite={addToFavorite} />
            <Typography>{props.favorites}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Stack
            onClick={addCommentHandler}
            direction={"row"}
            alignItems="center"
            spacing={1}
          >
            <CommentIcon
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              color="primary"
            />
            <Typography>{props.comment}</Typography>
          </Stack>
        </Grid>
        <Grid container item xs={6} justifyContent="flex-end">
          <Grid item xs={6} sm={5}>
            <Stack direction={"row"} alignItems="center" spacing={1}>
              <StarIcon sx={{ color: "var(--golden-color)" }} />
              <Typography>4.5</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default PlaceCard;
