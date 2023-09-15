import styled from "styled-components";
import { FaTrash, FaDownload } from "react-icons/fa";
import MiniLoader from "../ui/MiniLoader";
import useDownload from "../hooks/useDownload";
import { useComicUploadDetails } from "../hooks/useComicUploadDetails";
import useComicDelete from "../hooks/useComicDelete";

function ComicUpload() {
  const { data, isLoading, error } = useComicUploadDetails();

  const { mutate, deleteError, isDeleting } = useComicDelete();
  function handleDelete() {
    mutate();
  }
  const {
    mutate: handleDownload,
    isDownloading,
    isDownloadError,
  } = useDownload();
  if (error || (deleteError && deleteError.message) || isDownloadError) {
    return <div>Something went wrong ...</div>;
  }

  return (
    <ComicContainer>
      {isLoading ? (
        <MiniLoader />
      ) : (
        <>
          {data && data?.updatedAt ? (
            <ComicText>
              You already uploaded a comic for this week on{" "}
              <strong>{data?.updatedAt}</strong>
            </ComicText>
          ) : (
            <ComicText>No comic information available.</ComicText>
          )}
          {data?.updatedAt ? (
            <ButtonContainer>
              <Button
                primary
                onClick={() => handleDownload()}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <MiniLoader />
                ) : (
                  <>
                    <FaDownload />
                    Download
                  </>
                )}
              </Button>
              <SecondaryButton
                onClick={handleDelete}
                disabled={deleteError}
                primary={false}
              >
                {isDeleting ? (
                  <MiniLoader />
                ) : (
                  <>
                    <FaTrash />
                    Delete
                  </>
                )}
              </SecondaryButton>
            </ButtonContainer>
          ) : null}
        </>
      )}
    </ComicContainer>
  );
}

export default ComicUpload;
const ComicContainer = styled.div`
  font-family: "Arial", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  gap: 20px;
`;

const ComicText = styled.p`
  font-size: 16px;
  color: #333;
  margin: 0;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const Button = styled.button`
  padding: 12px 20px;
  width: 150px;
  height: 40px;
  font-size: 14px;
  background-color: ${(props) => (props.primary ? "#007bff" : "#ccc")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: ${(props) => (props.primary ? "#0056b3" : "#aaa")};
  }
`;

const SecondaryButton = styled(Button)`
  background-color: #f44336;
  &:hover {
    background-color: #d32f2f;
  }
`;
