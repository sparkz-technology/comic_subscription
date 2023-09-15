import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export async function UserChart(type) {
  const response = await axios.post(
    `http://localhost:8000/admin/user/${type}`,
    {},
    {
      headers: {
        contentType: "application/json",

        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      withCredentials: true, // Include cookies in the request
    }
  );
  const data = response.data;
  if (response.status !== 200) {
    return { error: "An error occurred" };
  }
  return data.data;
}

export async function UserLog() {
  const response = await axios.post(
    `http://localhost:8000/admin/user/data`,
    {},
    {
      headers: {
        contentType: "application/json",

        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      withCredentials: true, // Include cookies in the request
    }
  );
  const data = response.data;
  console.log(data.data);
  if (response.status !== 200) {
    return { error: "An error occurred" };
  }
  return data.data;
}

export async function ComicUploadDetails() {
  const response = await axios.post(
    "http://localhost:8000/admin/details",
    {},
    {
      headers: {
        contentType: "application/json",

        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      withCredentials: true, // Include cookies in the request
    }
  );
  const data = response.data;
  if (response.status !== 200) {
    return { error: "An error occurred" };
  }
  return data;
}

export async function ComicDelete() {
  const response = await axios.post(
    "http://localhost:8000/admin/delete",
    {},
    {
      headers: {
        contentType: "application/json",

        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      withCredentials: true, // Include cookies in the request
    }
  );
  const data = response.data;
  if (response.status !== 200) {
    return { error: "An error occurred" };
  }
  return data;
}

export async function UploadComicBook(file, setUploadPercentage) {
  const formData = new FormData();
  formData.append("pdf", file);

  const response = await axios.post(
    "http://localhost:8000/admin/upload",
    formData,
    {
      headers: {
        contentType: "application/json",

        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      withCredentials: true, // Include cookies in the request
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadPercentage(percentCompleted); // Update the progress percentage
      },
    }
  );

  const data = response.data;
  return data;
}

export async function Download() {
  const responce = await axios.post(
    "http://localhost:8000/admin/download",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true, // Include cookies in the request
    }
  );
  const url = window.URL.createObjectURL(new Blob([responce.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "comic.pdf");
  document.body.appendChild(link);
  link.click();
  const data = responce.data;
  return data;
}
