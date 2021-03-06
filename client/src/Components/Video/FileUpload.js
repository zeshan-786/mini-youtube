import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const UploadMutation = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      path
      id
      filename
      mimetype
    }
  }
`;
const FileUpload = () => {
  const [uploadFile] = useMutation(UploadMutation);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      // Do something with the files
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
        uploadFile({
          variables: { file: binaryStr },
          onCompleted: () => {},
        });
      };
      reader.readAsArrayBuffer(file);
    },
    [uploadFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive && "isActive"}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    </>
  );
};
export default FileUpload;
