import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import { API_BASE_URL } from "../settings";

const initial = [
  { id: 1, title: "haha", content: "no con", release: "2024-04-04" },
  { id: 2, title: "kaka", content: "no con", release: "2024-04-04" },
];
const inittialForm = {
  id: "",
  title: "",
  content: "",
  release: "",
};
export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [isOpenForm, setIsOPenForm] = useState(false);
  const { user, error, isLoading } = useUser();
  const [token, setToken] = useState("");
  const [role, setRole] = useState(0);
  const [movieDto, setMovieDto] = useState(inittialForm);
  const [status, setStatus] = useState("");

  useEffect(() => {
    getmovies();
    if (user) {
      setToken(JSON.parse(localStorage.getItem("token")));
      setRole(JSON.parse(localStorage.getItem("role")));
    }
  }, [user]);

  const handleClickOpenForm = (action, value) => {
    setIsOPenForm(true);
    // setAction(action)
    if (value) {
      setMovieDto(value);
    } else {
      setMovieDto(inittialForm);
    }
  };
  const handleClickCancel = () => {
    setIsOPenForm(false);
    setMovieDto(inittialForm);
  };

  const handleChangeValue = (e) => {
    setMovieDto({ ...movieDto, [e.target.name]: e.target.value });
  };
  const getmovies = async () => {
    console.log(API_BASE_URL);
    const res = await fetch(`${API_BASE_URL}/movies`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      return await res.json();
    });
    console.log(res);
    setMovies(res?.movies || []);
  };

  const handleOnSave = async (type, id) => {
    console.log(process.env);
    if (movieDto.title == "" || movieDto.release == "" || movieDto.content == "") {
      alert("Please not empty input");
      setIsOPenForm(false);
      return;
    }
    if (type == "create") {
      console.log(movieDto);
      const res = await fetch(`${API_BASE_URL}/movies`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(movieDto),
      }).then(async (res) => {
        return await res.json();
      });
    } else if (id != "") {
      const res = await fetch(`${API_BASE_URL}/movies/${id}`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(movieDto),
      }).then(async (res) => {
        return await res.json();
      });
    }
    setIsOPenForm(false);
    getmovies();
  };

  const handleDelete = async (id) => {
    console.log(token, "hahaha");
    const res = await fetch(`${API_BASE_URL}/movies/${id}`, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
      },
    }).then(async (res) => {
      return await res.json();
    });
    getmovies();
  };
  return (
    <>
      <div className={styles.container}>
        {user && (role == 8 || role == 6) && (
          <button onClick={() => handleClickOpenForm("create")}>Create</button>
        )}
        {movies.map((value, index) => (
          <ul key={value.id}>
            <h3>{value.title}</h3>
            <li>Release: {value.release}</li>
            <li>Content: {value.content}</li>
            {user && role == 8 && (
              <button onClick={() => handleClickOpenForm("edit", value)}>
                edit
              </button>
            )}
            {user && (role == 8 || role == 6) && (
              <button onClick={() => handleDelete(value.id)}> remove</button>
            )}
          </ul>
        ))}
        <dialog
          open={isOpenForm}
          style={{
            height: 180,
            width: 350,
            alignContent: "center", position:"absolute",
            zIndex: 100,
            top: 100,
          }}
        >
          <div style={{ margin: 7 }}>
            <label style={{ marginRight: 10 }}>Title </label>
            <input
              style={{ margin: 10, marginLeft: 15 }}
              value={movieDto.title}
              name="title"
              onChange={handleChangeValue}
            />
            <br />
            <label style={{ marginRight: 10 }}>Release </label>
            <input
              style={{ margin: 10, marginLeft: 30 }}
              value={movieDto.release}
              name="release"
              onChange={handleChangeValue}
            />
            <br />
            <label style={{ marginRight: 10 }}>Content</label>
            <input
              style={{ margin: 10, marginLeft: 10 }}
              value={movieDto.content}
              name="content"
              onChange={handleChangeValue}
            />
            <br />
            {movieDto.id != "" ? (
              <button
                onClick={() => handleOnSave("edit", movieDto.id)}
                type="button"
              >
                Update
              </button>
            ) : (
              <button onClick={() => handleOnSave("create")} type="button">
                Add
              </button>
            )}
            <button onClick={handleClickCancel} type="button">
              Cancel
            </button>
          </div>
        </dialog>
      </div>
    </>
  );
}
