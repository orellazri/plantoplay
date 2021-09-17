import { useState } from "react";
import { useHistory } from "react-router-dom";

import Input from "../components/core/Input";

function SearchBar() {
  const history = useHistory();

  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    console.log("Search for " + searchText);
    setSearchText("");
    history.push("/search/" + searchText);
  };

  return (
    <div className="relative w-full">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#bbbbbb">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </span>
      <form onSubmit={handleSearch}>
        <Input
          type="text"
          className="px-10 rounded-lg"
          placeholder="Search a game..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>
    </div>
  );
}

export default SearchBar;
