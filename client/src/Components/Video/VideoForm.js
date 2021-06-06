import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/PersonAdd";

import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";

import { useMutation, gql } from "@apollo/client";

// import Notification from "../UI/Notification/Notification";
// import Spinner from "../UI/Spinner/Spinner";
import ContentView from "../UI/ContentView/ContentView";

const UPLOAD_VIDEO = gql`
  mutation createVideo(
    $title: String!
    $url: String!
    $description: String
    $thumnail: String
  ) {
    createVideo(
        title: $title
        url: $url
        description: $description
        thumnail: $thumnail
    ) {
        id
        title
        description
        url
        thumnail
        updatedAt
        createdAt
    }
  }
`;



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  center: { margin: "5px auto" },
}));

const VideoForm = (props) => {
  const classes = useStyles();
  const [title, setTitle] = useState({ value: "" });
  const [description, setDescription] = useState({ value: "" });
  const [url, setUrl] = useState({ value: "" });
  const [thumbnail, setThumbnail] = useState({ value: "" });


  const onFieldChange = (event, fieldName) => {
    switch (fieldName) {
      case "title":
        setTitle({ value: event.target.value });
        break;
      case "description":
        setDescription({ value: event.target.value });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  let form = (
    <>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="title"
        label="Title"
        type="text"
        id="title"
        autoComplete="title"
        value={title.value}
        onChange={(event) => onFieldChange(event, "title")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        type="description"
        id="description"
        label="Description"
        name="description"
        autoComplete="description"
        autoFocus
        value={description.value}
        onChange={(event) => onFieldChange(event, "description")}
      />
    </>
  );

  return (
    <ContentView>
      <CssBaseline />
      <Avatar className={[classes.avatar, classes.center].join(" ")}>
        <LockOutlinedIcon />
      </Avatar>
      <form className={classes.form} noValidate>
        {form}
        <Button
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
          startIcon={<SaveIcon />}
        >
          Upload Video
        </Button>
      </form>
    </ContentView>
  );
};


export default VideoForm;