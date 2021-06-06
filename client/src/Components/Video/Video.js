// import React from "react";
// const Video = ({ video: { id, title, description, url, thumnail }, setId }) => {
//   return (
//     <div
//       style={{
//         width: "29%",
//         textAlign: "center",
//         border: "1px solid pink",
//         margin: "10px",
//         borderRadius: "10px",
//         cursor: "pointer",
//       }}
//       onClick={() => setId(id)}
//     >
//       <h3>{id}</h3>
//       <h4>{title}</h4>
//       <p>{description}</p>
//       <p>{url}</p>
//       <p>{thumnail}</p>
//     </div>
//   );
// };

import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Video = ({ video: { id, title, description, url, thumnail }, setId }) => {
  return (
    <Grid item xs={12} md={12} lg={12} spacing={3}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={thumnail}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button onClick={() => setId(id)} size="small" color="primary">
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Video;
