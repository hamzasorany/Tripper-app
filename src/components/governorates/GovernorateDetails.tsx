import React from "react";
import { useParams, Outlet, useNavigate } from "react-router-dom";
import useFetchGovernorateDetails from "../../customHooks/useFetchGoveronrateDetails";
import GovernorateImg from "./GovernorateImg";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Carousel from "../../sharedComponents/crarousel/Carousel";
import Outline from "../../sharedComponents/Outline";
import TripCard from "../../sharedComponents/TripCard";
import PlaceCard from "../../sharedComponents/PlaceCard";
import useFetchTrips from "../../customHooks/useFetchTrips";
import useFetchPlaces from "../../customHooks/useFetchPlaces";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CoffeeIcon from "@mui/icons-material/Coffee";
import CastleIcon from "@mui/icons-material/Castle";
import HotelIcon from "@mui/icons-material/Hotel";
import { multiItem } from "../../sharedData/carouselResponsive";
import Loading from "../../sharedComponents/Loading";
import isLoading from "../../sharedFunction/isLoading";
type paramsType = {
  governorateId: string | undefined;
};
const citySections = [
  {
    id: 1,
    name: "مطاعم",
    icon: <RestaurantIcon />,
  },
  {
    id: 2,
    name: "مقاهي",
    icon: <CoffeeIcon />,
  },
  {
    id: 3,
    name: "أثري",
    icon: <CastleIcon />,
  },
  {
    id: 4,
    name: "فنادق",
    icon: <HotelIcon />,
  },
];
type sectionType = "مطاعم" | "مقاهي" | "أثري" | "فنادق";
const GovernorateDetails = () => {
  const [section, setSection] = React.useState<sectionType>("مطاعم");
  const { governorateId } = useParams<paramsType>();
  const navigate = useNavigate();
  const isthereGover =
    typeof governorateId !== "undefined" ? Number(governorateId) : 1;
  const [fetchGovernorateDetailsStatus, governorateDetails] =
    useFetchGovernorateDetails(isthereGover);
  const [fetchTripsStatus, trips] = useFetchTrips();
  const [fetchPlacesStatus, places] = useFetchPlaces(
    `?filter[place_type]=${section}&filter[city_id]=${governorateId}`
  );

  if (
    typeof governorateId !== "undefined" &&
    typeof governorateDetails !== "undefined"
  ) {
    return (
      <>
        <Outlet />
        {(isLoading(fetchTripsStatus) ||
          isLoading(fetchGovernorateDetailsStatus)) && <Loading />}
        <Grid container justifyContent={"center"} spacing={3}>
          <Grid item xs={11} md={9} lg={5.5}>
            <GovernorateImg
              img={"/images/aleppo.jpg"}
              governorateName={governorateDetails.name}
            />
          </Grid>
          <Grid item xs={11} md={9} lg={5.5}>
            <Stack spacing={2}>
              <Typography variant="h4">{`مدينة ${governorateDetails.name}`}</Typography>
              <Typography color={"GrayText"}>
                {governorateDetails.description}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={11}>
            <Outline
              title={`الرحلات ضمن مدينة ${governorateDetails.name}`}
              navigateTo=""
            />
            <Carousel responsive={multiItem}>
              {trips.map((trip) => {
                return (
                  <TripCard
                    key={trip.id}
                    description={trip.description}
                    numberOfDays={trip.number_of_days}
                    canNotFavorite={true}
                  />
                );
              })}
            </Carousel>
          </Grid>
          <Grid item xs={11}>
            <Typography
              sx={{
                fontSize: { xs: "25px", sm: "30Px", md: "35px", lg: "40px" },
                fontWeight: { sx: "defualt", md: "700" },
              }}
            >
              اقسام المدينة
            </Typography>
            <Stack
              sx={{ my: 2 }}
              direction={"row"}
              spacing={2}
              justifyContent={"center"}
            >
              {citySections.map((_section, index) => {
                return (
                  <Button
                    variant={section === _section.name ? "outlined" : "text"}
                    sx={{ boxShadow: 2 }}
                    onClick={() => setSection(_section.name as sectionType)}
                    endIcon={_section.icon}
                  >
                    {_section.name}
                  </Button>
                );
              })}
            </Stack>
            <Grid
              container
              justifyContent={{ xs: "center", sm: "flex-start" }}
              alignItems="center"
              spacing={2}
            >
              {places.map((place, index) => {
                return (
                  <Grid item xs={11} sm={6} md={4}>
                    <PlaceCard
                      key={index}
                      props={place}
                      onClick={() => navigate(`/place/${place.id}`)}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  } else
    return (
      <>
        <Outlet />
      </>
    );
};

export default GovernorateDetails;
