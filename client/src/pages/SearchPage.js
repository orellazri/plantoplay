import { useEffect, useState } from "react";
import axios from "axios";

import Link from "../components/core/Link";
import Spinner from "../components/core/Spinner";

function SearchPage({ match }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const { data } = await axios.get(`/games/search/${match.params.name}`);
        setResults(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSearch();
  }, []);

  return (
    <>
      {loading && (
        <div className="flex justify-center ">
          <Spinner />
        </div>
      )}
      {!loading && (
        <div className="grid grid-cols-2 gap-10 md:pl-32 md:grid-cols-3 lg:grid-cols-4">
          {results.map((result, i) => (
            <Link to={`/game/${result.slug}`}>
              <div
                key={i}
                className="relative w-48 text-center bg-center bg-no-repeat bg-cover rounded-lg shadow-md h-80"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.8)), url(${
                    result.cover ? result.cover.url : ""
                  })`,
                }}
              >
                <div className="absolute w-full text-lg font-bold bottom-5">{result.name}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default SearchPage;
