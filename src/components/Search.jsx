import { useCallback, useState } from "react";
import { Input } from "@chakra-ui/react";
import axios from "axios";
import { useAuthContext } from "../context/Provider";

const Search = () => {
  let { searchUser, setSearchUser } = useAuthContext();
  const [response, setResponse] = useState({});
  const [bearer, setBearer] = useState(() => {
    localStorage.getItem("Bearer");
  });

  const searchBox = document.getElementById("search-box");
  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "k") {
      event.preventDefault();
      searchBox.focus();
    }

    if (event.key === "Escape") {
      searchBox.blur();
    }
  });

  const handleChange = useCallback(
    (e) => {
      const headers = {
        Authorization: `Bearer ${bearer}`,
        "Content-Type": "application/json",
      };
      let debouncerTimeId;
      setSearchUser(e.target.value);
      clearTimeout(debouncerTimeId);
      debouncerTimeId = setTimeout(() => {
        axios
          .get("http://127.0.0.1:8000/api/search/searchuser?q=" + searchUser, {
            headers,
          })
          .then((res) => {
            console.log(res);
            setResponse(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }, 500);
    },
    [searchUser, bearer, setSearchUser]
  );

  return (
    <>
      <div className="search">
        <Input
          variant="filled"
          type="text"
          placeholder="search technocrats press ctr+k"
          value={searchUser}
          id="search-box"
          onChange={handleChange}
          style={{ width: "150%" }}
        />
        {searchUser && <UserList response={response} />}
      </div>
    </>
  );
};

const UserList = ({ response }) => {
  const users = response.data ? response.data.users : null;
  return (
    <>
      <ul className="user-list">
        {users &&
          users.map((user) => {
            return <li key={user.id}>{user.name}</li>;
          })}
      </ul>
    </>
  );
};

export default Search;
