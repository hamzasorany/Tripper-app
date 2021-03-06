import React, { useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import UserImg from "../../sharedComponents/UserImg";
import InputPassword from "../../sharedComponents/InputPassword";
import InputText from "../../sharedComponents/InputText";
import InputSelect from "../../sharedComponents/InputSelect";
import useToggleEle from "../../customHooks/useToggleEle";
import useUpdataUserInfo from "../../customHooks/useUpdataUserInfo";
import { editUserProfile } from "../../sharedType/userType";
import alertType from "../../sharedType/alertType";
import genderTypes from "../../sharedData/genderTypes";
import governorates from "../../sharedData/governorates";
import OutlineGoBack from "../../sharedComponents/OutlineGoBack";
import LoadingButton from "../../sharedComponents/LoadingButton";
import Snackbar from "../../sharedComponents/SnackbarComponent";
import EditPassoword from "./EditPassoword";

const EditProfile = () => {
  const userData: editUserProfile = JSON.parse(
    localStorage.getItem("userInfo")!
  );
  const [firstName, setFirstName] = useState<string>(userData.first_name);
  const [lastName, setLastName] = useState<string>(userData.last_name);
  const [name, setName] = useState<string>(userData.name);
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [cityId, setCityId] = useState<string>(userData.city_id);
  const [gender, setGender] = useState<string>(userData.gender);
  const [alert, setAlert] = useState<alertType>("success");
  const [responseMessage, setResponseMessage] = React.useState<string>("");
  const [open, handelOpen, handelClose] = useToggleEle();
  const [openSnackbar, handelOpenSnackbar, handelCloseSnackbar] =
    useToggleEle();
  const userInfo = {
    first_name: firstName,
    last_name: lastName,
    name: name,
    gender,
    city_id: cityId,
  } as editUserProfile;
  const [updateUserInfoStatus, update] = useUpdataUserInfo(
    userInfo,
    setResponseMessage
  );

  React.useEffect(() => {
    if (responseMessage === "Operation succeeded.") {
      setAlert("success");
      handelOpenSnackbar();
      setResponseMessage("");
    }
  }, [responseMessage, handelOpenSnackbar]);

  return (
    <>
      <Grid
        sx={{
          minHeight: "70vh",
          my: 5,
        }}
        container
        justifyContent={"center"}
        alignItems="center"
      >
        <Grid item xs={11} sm={10} md={8} lg={6}>
          <Box
            sx={{
              p: 4,
              border: "1px solid var(--golden-color)",
              borderRadius: "1rem",
              boxShadow: "0px 0px 4px  var(--golden-color)",
            }}
          >
            <OutlineGoBack title="" />
            <Stack
              sx={{ p: 3, width: "100%" }}
              justifyContent="center"
              alignItems={"center"}
            >
              <UserImg choose={true} />
            </Stack>
            <Stack justifyContent={"center"} alignItems={"center"} spacing={2}>
              <InputText
                label="?????????? ??????????"
                type="text"
                value={firstName}
                setValue={setFirstName}
              />
              <InputText
                label="?????????? ????????????"
                type="text"
                value={lastName}
                setValue={setLastName}
              />

              <InputSelect
                label="??????????????"
                items={governorates}
                value={cityId}
                setValue={setCityId}
              />
              <InputSelect
                label="??????????"
                items={genderTypes}
                value={gender}
                setValue={setGender}
              />
              <Typography
                variant="h6"
                color={"primary"}
                onClick={handelOpen}
                sx={{ "&:hover": { cursor: "pointer" } }}
              >
                ?????????? ?????????? ???????? ????????????
              </Typography>
            </Stack>

            <LoadingButton
              onClick={update}
              label="?????????? "
              loading={updateUserInfoStatus === "loading"}
              sx={{ display: "block", m: "15px auto", minWidth: "50%" }}
            />
          </Box>
        </Grid>
      </Grid>
      <EditPassoword open={open} handelClose={handelClose}>
        <Stack spacing={1}>
          <InputPassword
            label="???????? ???????????? ??????????????"
            value={password}
            setValue={setPassword}
            width={"100%"}
          />
          <InputPassword
            label="???????? ???????????? ??????????????"
            value={passwordConfirmation}
            setValue={setPasswordConfirmation}
            width={"100%"}
          />
          <InputPassword
            label="?????????? ???????? ???????????? ??????????????"
            value={passwordConfirmation}
            setValue={setPasswordConfirmation}
            width={"100%"}
          />
        </Stack>
      </EditPassoword>
      <Snackbar
        alertType={alert}
        open={openSnackbar}
        handleClose={handelCloseSnackbar}
        succeededMessage={"???? ?????????? ???????????????? ??????????"}
      />
    </>
  );
};

export default EditProfile;
