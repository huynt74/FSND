import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import { API_BASE_URL } from "../settings";


const initial = [
  { id: 1, name: "huy", age: 24, gender: "male" },
  { id: 2, name: "huy", age: 24, gender: "male" },
];
const inittialForm = {
  id: "",
  name: "",
  age: "",
  gender: "",
};
export default function Actor() {
  const [actors, setActors] = useState([]);
  const [isOpenForm, setIsOPenForm] = useState(false);
  const { user, error, isLoading } = useUser();
  const [token, setToken] = useState("");
  const [role, setRole] = useState(0);
  const [actorDto, setActorDto] = useState(inittialForm);
  const [status, setStatus] = useState("");

  useEffect(() => {
    getActors();
    if (user) {
      setToken(JSON.parse(localStorage.getItem("token")));
      setRole(JSON.parse(localStorage.getItem("role")));
    }
  }, [user]);

  const handleClickOpenForm = (action, value) => {
    setIsOPenForm(true);
    // setAction(action)
    if (value) {
      setActorDto(value);
    } else {
      setActorDto(inittialForm);
    }
  };
  const handleClickCancel = () => {
    setIsOPenForm(false);
    setActorDto(inittialForm);
  };

  const handleChangeValue = (e) => {
    setActorDto({ ...actorDto, [e.target.name]: e.target.value });
  };
  const getActors = async () => {
    console.log(API_BASE_URL);
    const res = await fetch(`${API_BASE_URL}/actors`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      return await res.json();
    });
    console.log(res);
    setActors(res?.actors || []);
  };

  const handleOnSave = async (type, id) => {
    console.log(process.env);
    if (actorDto.age == "" || actorDto.name == "" || actorDto.gender == "") {
      alert("Please not empty input");
      setIsOPenForm(false);
      return;
    }
    if (type == "create") {
      console.log(actorDto);
      const res = await fetch(`${API_BASE_URL}/actors`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(actorDto),
      }).then(async (res) => {
        return await res.json();
      });
    } else if (id != "") {
      const res = await fetch(`${API_BASE_URL}/actors/${id}`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(actorDto),
      }).then(async (res) => {
        return await res.json();
      });
    }
    setIsOPenForm(false);
    getActors();
  };

  const handleDelete = async (id) => {
    console.log(token, "hahaha");
    const res = await fetch(`${API_BASE_URL}/actors/${id}`, {
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
    getActors();
  };
  return (
    <>
      <div className={styles.container}>
        {user && (role == 8 || role == 6) && (
          <button onClick={() => handleClickOpenForm("create")}>Create</button>
        )}
        {actors.map((value, index) => (
          <ul key={value.id}>
            <h3>{value.name}</h3>
            <li>Age: {value.age}</li>
            <li>Gender: {value.gender}</li>
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
            alignContent: "center",
            zIndex: 4,
            top: 100,
          }}
        >
          <div style={{ margin: 7 }}>
            <label style={{ marginRight: 10 }}>Name </label>
            <input
              style={{ margin: 10, marginLeft: 15 }}
              value={actorDto.name}
              name="name"
              onChange={handleChangeValue}
            />
            <br />
            <label style={{ marginRight: 10 }}>Age </label>
            <input
              style={{ margin: 10, marginLeft: 30 }}
              value={actorDto.age}
              name="age"
              type="number"
              onChange={handleChangeValue}
            />
            <br />
            <label style={{ marginRight: 10 }}>Gender</label>
            <input
              style={{ margin: 10, marginLeft: 10 }}
              value={actorDto.gender}
              name="gender"
              onChange={handleChangeValue}
            />
            <br />
            {actorDto.id != "" ? (
              <button
                onClick={() => handleOnSave("edit", actorDto.id)}
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
