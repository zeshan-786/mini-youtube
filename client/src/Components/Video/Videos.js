import React, { useState } from "react";

import { useQuery, gql } from "@apollo/client";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Video from "./Video";
import VideoDetails from "./VideoDetails";
import ContentView from "../UI/ContentView/ContentView";
import Spinner from "../UI/Spinner/Spinner";
import Notification from "../UI/Notification/Notification";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 400,
  },
}));

const VIDEOS_QUERY = gql`
  query VideosQuery($page: Int, $limit: Int) {
    getVideos(page: $page, limit: $limit) {
      videos {
        id
        id
        title
        url
        description
        thumnail
      }
      totalPages
      current
    }
  }
`;
const Videos = (props) => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [videoId, setVideoId] = useState(null);
  const { loading, error, data } = useQuery(VIDEOS_QUERY);

  if (loading) return <Spinner />;
  if (error)
    return (
      <Notification
        severity={"error"}
        message={error && error[0] ? error[0] : "something went wrong"}
      />
    );

  console.log(data);

  const renderVideos = data ? (
    <Grid container spacing={3}>
      {data.getVideos.videos.map((video) => (
        <Video key={video.id} video={video} setId={(id) => setVideoId(id)} />
      ))}
    </Grid>
  ) : (
    <h1>No videos to show</h1>
  );

  return (
    <ContentView>
      <Grid item xs={12} md={8} lg={8}>
        <Paper className={fixedHeightPaper}>
          {videoId && <VideoDetails id={videoId} />}
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <Paper>{renderVideos}</Paper>
      </Grid>
    </ContentView>
  );
};

export default Videos;
