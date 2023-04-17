import { useState } from "react";
import { Input } from "@chakra-ui/react";
const Search = () => {
  const [searchBlog, setSearchBlog] = useState("");
  const searchbox = document.getElementById("search");
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "k") {
      e.preventDefault();
      searchbox.focus();
    } else if (e.key === "Escape") {
      searchbox.blur();
    }
  });
  return (
    <>
      <div className="search">
        <Input
          variant="filled"
          type="text"
          placeholder="search technocrats press ctr+k"
          value={searchBlog}
          id="search"
          onChange={(e) => setSearchBlog(e.target.value)}
        />
      </div>
    </>
  );
};

export default Search;
