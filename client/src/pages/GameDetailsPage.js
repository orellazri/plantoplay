import axios from "axios";
import { useState, useEffect } from "react";
import Alert from "../components/core/Alert";

import Spinner from "../components/core/Spinner";

function GameDetailsPage({ match }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState({});

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const { data } = await axios.get(`/games/game/${match.params.slug}`);
        setResult(data);
      } catch (err) {
        console.log(err);
        setError("An error occured. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    // TODO: temporary
    // setResult({
    //   id: 28204,
    //   cover: {
    //     id: 82135,
    //     url: "//images.igdb.com/igdb/image/upload/t_cover_big/co1rdj.jpg",
    //   },
    //   genres: [
    //     { id: 5, name: "Shooter" },
    //     { id: 6, name: "RPG" },
    //   ],
    //   name: "Call of Duty: WWII",
    //   summary:
    //     "Call of Duty: WWII creates the definitive World War II next generation experience across three different game modes: Campaign, Multiplayer, and Co-Operative. Featuring stunning visuals, the Campaign transports players to the European theater as they engage in an all-new Call of Duty story set in iconic World War II battles. Multiplayer marks a return to original, boots-on-the ground Call of Duty gameplay. Authentic weapons and traditional run-and-gun action immerse you in a vast array of World War II-themed locations. The Co-Operative mode unleashes a new and original story in a standalone game experience full of unexpected, adrenaline-pumping moments.",
    // });
    // setLoading(false);
    // ---- END temporary

    fetchGame();
  }, [match.params.slug]);

  return (
    <>
      {loading && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
      {!loading && (
        <>
          {error && <Alert error>{error}</Alert>}
          {!error && (
            <div className="px-5">
              <div className="flex flex-col items-center md:items-start md:flex-row">
                {/* Left column (game image) */}
                <div>
                  <div
                    className="relative w-56 text-center bg-center bg-no-repeat bg-cover rounded-lg shadow-md h-96"
                    style={{
                      backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.8)), url(${
                        result.cover ? result.cover.url : ""
                      })`,
                    }}
                  ></div>
                </div>
                {/* Right column (game info) */}
                <div className="mt-5 md:ml-10 md:mt-0 ">
                  {/* Name */}
                  <div className="text-2xl font-bold">{result.name}</div>
                  {/* Summary */}
                  <div className="mt-5 opacity-70">
                    <p>{result.summary}</p>
                  </div>
                  {/* Genres */}
                  <div className="flex mt-5 space-x-3">
                    {result.genres &&
                      result.genres.map((genre, i) => (
                        <div className="px-3 py-2 font-semibold bg-gray-700 rounded-full" key={i}>
                          {genre.name}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default GameDetailsPage;
