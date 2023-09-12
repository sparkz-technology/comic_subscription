/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import axios from "axios";
import {
  FaUpload,
  FaFilePdf,
  FaExclamationCircle,
  FaSpinner,
  FaTrash,
} from "react-icons/fa";

const Container = styled.div`
  color: #333;
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  width: 600px;
  height: 300px;
  margin: 0 auto;
  text-align: center;
`;

const DropzoneContainer = styled.div`
  background-color: #f9f9f9;
  border: 2px dashed #555;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  cursor: pointer;
  margin: 20px 0;
  background-color: #fff;
  border-radius: 10px;
  transition: background-color 0.2s;
`;

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin-top: 10px;
  transition: background-color 0.2s;
`;

const FileTypeIcon = styled.div`
  font-size: 32px;
  color: #007bff;
`;

const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  border-left: 2px solid #007bff;
  padding-left: 20px;
  width: 100%;
`;

const FileName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  text-decoration: underline;
`;

const FileSize = styled.div`
  font-size: 16px;
  color: #777;
  font-style: italic;
  padding: 10px 0;
`;

const UploadPercentage = styled.div`
  font-size: 16px;
  color: #777;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
  font-size: 20px;
  margin-left: auto;
  transition: color 0.2s;
  padding-left: 20px;

  &:hover {
    color: #ff6b6b;
  }
`;

const UploadButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 12px 24px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;

// const ProgressBarContainer = styled.div`
//   width: 100%;
//   background-color: #fff;
//   border-radius: 5px;
//   margin-top: 20px;
//   overflow: hidden;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;

// const Message = styled.div`
//   font-size: 18px;
//   margin-top: 20px;
//   text-align: center;
//   color: ${(props) => (props.error ? "#ff6347" : "#32cd32")};
// `;

const FileInfoText = styled.p`
  font-size: 16px;
  color: #777;
  margin-top: 10px;
  text-align: start;
  width: 100%;
`;

function UploadComicBook({ onCloseModal }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  //   const [uploadSuccess, setUploadSuccess] = useState(false);
  //   const [uploadError, setUploadError] = useState(false);
  const [fileSize, setFileSize] = useState("");
  const [uploadSpeed, setUploadSpeed] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0); // New state for upload percentage

  useEffect(() => {
    if (uploading) {
      const uploadInterval = setInterval(() => {
        setUploadProgress((prevProgress) => {
          if (prevProgress < 95) {
            return prevProgress + 5;
          }
          return prevProgress;
        });
      }, 500);

      return () => clearInterval(uploadInterval);
    }
  }, [uploading]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setUploadedFile(file);
      setFileSize((file.size / 1024).toFixed(2) + " KB");
      setUploadSpeed("");
      //   setUploadSuccess(false);
      //   setUploadError(false);
    },
  });

  const removeFile = () => {
    setUploadedFile(null);
    setFileSize("");
    setUploadSpeed("");
    // setUploadSuccess(false);
    // setUploadError(false);
    setUploadPercentage(0); // Reset upload percentage when the file is removed
  };

  const uploadFile = async () => {
    if (!uploadedFile) {
      toast.error("Please select a PDF file to upload.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("pdf", uploadedFile);

    try {
      const startTime = new Date().getTime();
      const response = await axios.post(
        "http://localhost:8000/admin/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);

            const currentTime = new Date().getTime();
            const elapsedTime = (currentTime - startTime) / 1000; // in seconds
            const speed = (progressEvent.loaded / elapsedTime / 1024).toFixed(
              2
            ); // in KB/s
            setUploadSpeed(speed + " KB/s");

            // Update the uploadPercentage state
            setUploadPercentage(percentCompleted);
          },
        }
      );

      if (response.status === 200) {
        // setUploadSuccess(true);
        toast.success("File uploaded successfully!");
        setUploadedFile(null);
      } else {
        // setUploadError(true);
        toast.error("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      //   setUploadError(true);
      toast.error("An error occurred while uploading the file.");
    } finally {
      setUploading(false);
      onCloseModal();

      setTimeout(() => {
        setUploadProgress(0);
        // setUploadSuccess(false);
        // setUploadError(false);
        setUploadSpeed("");
        setUploadPercentage(0); // Reset upload percentage when the upload is complete
      }, 3000);
    }
  };

  return (
    <Container>
      <DropzoneContainer {...getRootProps()}>
        <input {...getInputProps()} />
        {uploadedFile ? (
          <FileList>
            <FileItem>
              <FileTypeIcon>
                {uploadedFile.type === "application/pdf" ? (
                  <FaFilePdf />
                ) : (
                  <FaExclamationCircle />
                )}
              </FileTypeIcon>
              <FileInfo>
                <FileInfoText>
                  <FileName>{uploadedFile.name}</FileName>
                  <SpaceBetween>
                    <FileSize>File Size: {fileSize}</FileSize>
                    <FileSize>Upload Speed: {uploadSpeed}</FileSize>
                  </SpaceBetween>
                  <SpaceBetween>
                    <ProgressBar progress={uploadPercentage} />
                    <UploadPercentage>{uploadPercentage}%</UploadPercentage>
                  </SpaceBetween>
                </FileInfoText>
              </FileInfo>
              <RemoveButton onClick={removeFile}>
                <FaTrash />
              </RemoveButton>
            </FileItem>
          </FileList>
        ) : (
          <>
            <FaUpload />
            <p>Drag 'n' drop a PDF file here, or click to select a file</p>
          </>
        )}
      </DropzoneContainer>
      {/* <ProgressBarContainer>
        <ProgressBar progress={uploadProgress} />
      </ProgressBarContainer> */}
      <UploadButton onClick={uploadFile} disabled={uploading}>
        {uploading ? (
          <>
            <FaSpinner style={{ marginRight: "10px" }} />
            Uploading... ({uploadProgress}%)
          </>
        ) : (
          "Upload File"
        )}
      </UploadButton>
      {/* {uploadSuccess && <Message>Upload successful!</Message>}
      {uploadError && <Message error>Error during upload.</Message>} */}
    </Container>
  );
}

const ProgressBar = styled.div`
  width: ${(props) => props.progress}%;
  height: 7px;
  background-color: #007bff;
  margin-top: 5px;
  transition: width 0.2s;
  border-radius: 5px;
`;

export default UploadComicBook;

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;
