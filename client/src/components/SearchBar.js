import { SearchIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import Input from "../components/core/Input";

function SearchBar() {
  const history = useHistory();

  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    setSearchText("");
    history.push("/search/" + searchText);
  };

  return (
    <div className="relative w-full">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
          <SearchIcon className="w-5 h-5 text-gray-400" />
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
