import React from "react";
import { RootState } from "../app/store";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { mountComment, unMountComment } from "../features/PlaceAddCommentSlice";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import StarIcon from "@mui/icons-material/Star";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const Comments = () => {
  const dispatch = useAppDispatch();
  const commentStatus = useAppSelector(
    (state: RootState) => state.placeAddComment
  );
  const [commentValue, setCommentValue] = React.useState<string>("");
  const input = React.useRef<HTMLInputElement>(null);
  console.log(commentStatus.focus);
  if (commentStatus.focus) {
    input.current?.scrollIntoView({
      behavior: "smooth",
    });
  }

  React.useEffect(() => {
    return () => {
      dispatch(unMountComment());
    };
  }, [dispatch]);

  const sendCommentHandler = () => {
    dispatch(unMountComment());
  };
  return (
    <>
      <Stack direction={"row"} alignItems="center" sx={{ my: 1 }}>
        <Typography
          sx={{
            flexGrow: 1,
            fontSize: { xs: "25px", sm: "27Px", md: "30px", lg: "32px" },
            fontWeight: { sx: "defualt", md: "700" },
          }}
        >
          التعليقات و التقيمات
        </Typography>
        <Typography
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
          color={"GrayText"}
          onClick={() => {
            dispatch(mountComment());
          }}
        >
          إضافة تعليق
        </Typography>
      </Stack>
      <List sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}>
        {commentStatus.addComment && (
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="" src="/images/aleppo.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Brunch this weekend?"
              secondary={
                <Stack
                  direction={"row"}
                  spacing={2}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <TextField
                    focused={commentStatus.focus}
                    fullWidth
                    variant="outlined"
                    multiline
                    placeholder="add comment"
                    value={commentValue}
                    onChange={(e) => setCommentValue(e.target.value)}
                  />
                  <Button variant="contained" onClick={sendCommentHandler}>
                    تعليق
                  </Button>
                </Stack>
              }
            />
          </ListItem>
        )}
        {[1, 2, 3].map((comment) => {
          return (
            <ListItem key={comment} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="" src="/images/aleppo.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Brunch this weekend?"
                secondary={
                  " — I'll be in your neighborhood doing errands this…"
                }
              />
              <ListItemIcon>
                <Stack
                  direction={"row"}
                  alignItems="center"
                  justifyContent={"center"}
                  spacing={1}
                >
                  <StarIcon sx={{ color: "var(--golden-color)" }} />
                  <Typography>4.5</Typography>
                </Stack>
              </ListItemIcon>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default Comments;
