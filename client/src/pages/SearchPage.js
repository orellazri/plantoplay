import { useEffect } from "react";

function SearchPage({ match }) {
  useEffect(() => {
    // TODO: Call API
  }, []);

  return <div>Search page. Searching for {match.params.name}</div>;
}

export default SearchPage;
