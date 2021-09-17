import { useEffect } from "react";

function SearchPage({ match }) {
  useEffect(() => {
    console.log("Searching...");
  }, []);

  return <div>Search page. Searching for {match.params.title}</div>;
}

export default SearchPage;
