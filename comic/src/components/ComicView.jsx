import styled from "styled-components";
import { FaTrash, FaDownload } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import MiniLoader from "../ui/MiniLoader";
import axios from "axios";

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
  font-size: 14px;
  background-color: ${(props) => (props.primary ? "#007bff" : "#ccc")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  display: flex;
  align-items: center;
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

function ComicView() {
  const [comic, setComic] = useState({});
  const [loading, setLoading] = useState(false);

  const getComic = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/admin/details");
      setComic(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching comic:", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    function getDetails() {
      getComic();
    }
    getDetails();
  }, [getComic]);

  async function handleDelete() {
    setLoading(true);
    try {
      await axios.post("http://localhost:8000/admin/delete");
      setComic({});
      await getComic();
    } catch (error) {
      console.error("Error deleting comic:", error.message);
    } finally {
      setLoading(false);
    }
  }
  async function handleDownload() {
    try {
      const responce = await axios.get("http://localhost:8000/admin/download");
      // download file from response
      const url = window.URL.createObjectURL(new Blob([responce.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "comic.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading comic:", error.message);
    }
  }

  return (
    <ComicContainer>
      {loading ? (
        <MiniLoader />
      ) : (
        <>
          {comic && comic.updatedAt ? (
            <ComicText>
              You already uploaded a comic for this week on{" "}
              <strong>{comic.updatedAt}</strong>
            </ComicText>
          ) : (
            <ComicText>No comic information available.</ComicText>
          )}
          <ButtonContainer>
            <Button primary onClick={() => handleDownload()} disabled={loading}>
              <FaDownload /> Download
            </Button>
            <SecondaryButton
              onClick={() => handleDelete()}
              disabled={loading}
              primary={false}
            >
              <FaTrash /> Delete
            </SecondaryButton>
          </ButtonContainer>
        </>
      )}
    </ComicContainer>
  );
}

export default ComicView;
