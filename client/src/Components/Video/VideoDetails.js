import React from "react";
import Spinner from "../UI/Spinner/Spinner";
import Notification from "../UI/Notification/Notification";

import { useQuery, gql } from "@apollo/client";

const VIDEO_QUERY = gql`
  query VideoQuery($id: ID!) {
    video(id: $id) {
      id
      title
      url
      description
      createdAt
      updatedAt
    }
  }
`;

const VideoDetails = ({ id }) => {
  const { loading, error, data } = useQuery(VIDEO_QUERY, { variables: { id } });
  if (loading) return <Spinner />;
  if (error)
    return (
      <Notification
        severity={"error"}
        message={error && error[0] ? error[0] : "something went wrong"}
      />
    );
  return (
    <div
      style={{
        width: "90%",
        textAlign: "center",
        margin: "auto",
        // border: "2px solid gray",
        // borderRadius: "10px",
      }}
    >
      <h4> Video Details</h4>
      <h5>{data.video.id}</h5>
      <h4>{data.video.title}</h4>
      <p>{data.video.description}</p>
      <p>{data.video.url}</p>
      <p>{data.video.thumnail}</p>
      <h5>Create Time</h5>
      <p>
        {new Date(+data.video.createdAt).toDateString()},{" "}
        {new Date(+data.video.createdAt).toTimeString()}
      </p>
      <h5>Update Time</h5>
      <p>
        {new Date(+data.video.updatedAt).toDateString()},{" "}
        {new Date(+data.video.updatedAt).toTimeString()}
      </p>
    </div>
  );
};

export default VideoDetails;

// return (
//   <div
//     style={{
//       width: "90%",
//       textAlign: "center",
//       margin: "auto",
//       // border: "2px solid gray",
//       // borderRadius: "10px",
//     }}
//   >
//     <Query query={VIDEO_QUERY} variables={{ id }}>
//       {({ loading, error, data }) => {
//         if (loading) return <Spinner />;

//         if (error)
//           return (
//             <Notification
//               severity={"error"}
//               message={error && error[0] ? error[0] : "something went wrong"}
//             />
//           );

//         return (
//           <React.Fragment>
//             <h4> Video Details</h4>
//             <h5>{data.video.id}</h5>
//             <h4>{data.video.title}</h4>
//             <p>{data.video.description}</p>
//             <p>{data.video.url}</p>
//             <p>{data.video.thumnail}</p>
//             <h5>Create Time</h5>
//             <p>
//               {new Date(+data.video.createdAt).toDateString()},{" "}
//               {new Date(+data.video.createdAt).toTimeString()}
//             </p>
//             <h5>Update Time</h5>
//             <p>
//               {new Date(+data.video.updatedAt).toDateString()},{" "}
//               {new Date(+data.video.updatedAt).toTimeString()}
//             </p>
//           </React.Fragment>
//         );
//       }}
//     </Query>
//   </div>
// );
