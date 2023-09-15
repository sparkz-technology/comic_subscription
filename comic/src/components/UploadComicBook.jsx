/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import {
  FaUpload,
  FaFilePdf,
  FaExclamationCircle,
  FaSpinner,
  FaTrash,
} from "react-icons/fa";
import useUpload from "../hooks/useUpload";

function UploadComicBook({ onCloseModal }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileSize, setFileSize] = useState("");
  const [uploadSpeed, setUploadSpeed] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0); // New state for upload percentage

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setUploadedFile(file);
      setFileSize((file.size / 1024).toFixed(2) + " KB");
      setUploadSpeed("");
    },
  });

  const removeFile = () => {
    setUploadedFile(null);
    setFileSize("");
    setUploadSpeed("");
    setUploadPercentage(0); // Reset upload percentage when the file is removed
  };

  const UseUploadArg = [uploadedFile, setUploadPercentage, onCloseModal];
  const { mutate, isLoading, error } = useUpload(...UseUploadArg);
  const uploadFile = async () => {
    if (!uploadedFile) {
      toast.error("Please select a PDF file to upload.");
      return;
    }
    mutate();
  };

  return (
    <Container>
      {!uploadedFile && (
        <DropzoneContainer {...getRootProps()}>
          <input {...getInputProps()} />
          <>
            <FaUpload />
            <p>Drag 'n' drop a PDF file here, or click to select a file</p>
          </>
        </DropzoneContainer>
      )}
      {uploadedFile && (
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
                  <RemoveButton onClick={removeFile}>
                    <FaTrash />
                  </RemoveButton>
                </SpaceBetween>
                <SpaceBetween>
                  <ProgressBar progress={uploadPercentage} />
                  <UploadPercentage>{uploadPercentage}%</UploadPercentage>
                </SpaceBetween>
              </FileInfoText>
            </FileInfo>
          </FileItem>
        </FileList>
      )}
      <UploadButton onClick={uploadFile} disabled={isLoading}>
        Upload File
      </UploadButton>
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
  box-sizing: border-box;
`;
const Container = styled.div`
  color: #333;
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  /* width: 100%; */
  width: 600px;
  margin: 0 auto;
  box-sizing: border-box;

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
  box-sizing: border-box;
  transition: background-color 0.2s;
`;

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  box-sizing: border-box;
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
  box-sizing: border-box;

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
  box-sizing: border-box;
`;

const FileName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  text-decoration: underline;
  box-sizing: border-box;
`;

const FileSize = styled.div`
  font-size: 16px;
  color: #777;
  font-style: italic;
  padding: 10px 0;
  box-sizing: border-box;
`;

const UploadPercentage = styled.div`
  font-size: 16px;
  color: #777;
  box-sizing: border-box;
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
  box-sizing: border-box;

  &:hover {
    color: #ff6b6b;
  }
`;

const UploadButton = styled.button`
  margin-top: 20px;
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

const FileInfoText = styled.p`
  font-size: 16px;
  color: #777;
  margin-top: 10px;
  text-align: start;
  width: 100%;
`;
