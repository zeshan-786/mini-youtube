import { useMutation, gql } from "@apollo/client";

import Notification from "../UI/Notification/Notification";
import Spinner from "../UI/Spinner/Spinner";
import ContentView from "../UI/ContentView/ContentView";

const FILE_UPLOAD = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
      message
    }
  }
`;

const VideoUplaod = () => {
  const [mutate, { loading, error, data }] = useMutation(FILE_UPLOAD,{
    onCompleted:({ uploadFile })=>{
      
    }
  });

  const onChange = ({ target: { validity, files } }) => {
    if (validity.valid) mutate({ variables: { file: files[0] } });
  }

  if (data) return <p>
  {data.uploadFile.url}
  <Notification message={data.uploadFile.message} severity={data?.uploadFile?.message.toLowerCase().includes('success') ? 'success' : 'error'} />;
  </p>
  if (loading) return <Spinner />;
  if (error)
    return <Notification message={"something went wrong"} severity={"error"} />;

  return (
    <ContentView>
      <input type="file" required onChange={onChange} />

    </ContentView>
  );
};

export default VideoUplaod;
