import React, { useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Video from "./Video";
import VideoDetails from "./VideoDetails";
import Error from "../../General/Error";

const VIDEOS_QUERY = gql`
query VideosQuery($page: Int, $limit: Int ) {
    getVideos( page: $page, limit: $limit ){
      id
      title
      url
      description
      createdAt
      updatedAt
    }
  }
`;
const Videos = (props) => {
  const [videoId, setVideoId] = useState(null);

  return (
    <div style={{ display: "flex", flexFlow: "row wrap" }}>
      {videoId && <VideoDetails id={videoId} />}
      <Query query={VIDEOS_QUERY}>
        {({ loading, error, data }) => {
          if (loading)
            return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
          if (error) return <Error errors={data.errors} />

          return (

            <React.Fragment>
              {data.getVideos.map((user) => (
                <Video key={user.id} video={user} setId={(id) => setVideoId(id)} />
              ))}
            </React.Fragment>
          );
        }}
      </Query>
    </div>
  );
};

export default Videos;
