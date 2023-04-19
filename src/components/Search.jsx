import { useState } from "react";
import { Input } from "@chakra-ui/react";
import axios from "axios";
import { useAuthContext } from "../context/Provider";

const Search = () => {
  let { searchUser, setSearchUser } = useAuthContext();
  const [bearer, setBearer] = useState(() => {
    localStorage.getItem("Bearer");
  });

  const headers = {
    Authorization: `Bearer ${bearer}`,
    "Content-Type": "application/json",
  };
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

  const handleChange = (e) => {
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
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

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
        />
      </div>
    </>
  );
};

const UserList = () => {};

export default Search;
