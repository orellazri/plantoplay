import axios from "axios";
import { useState, useEffect } from "react";
import Alert from "../components/core/Alert";

import { availableLists } from "../utils";
import Spinner from "../components/core/Spinner";
import Link from "../components/core/Link";

function GameDetailsPage({ match }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState({});

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const { data } = await axios.get(`/games/game/${match.params.slug}`);
        setGame(data);
      } catch (err) {
        console.log(err);
        setError("An error occured. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    // // TODO: temporary
    // setGame({
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
    //   user: {
    //     list: "playing",
    //   },
    // });
    // setLoading(false);
    // // ---- END temporary

    fetchGame();
  }, [match.params.slug]);

  const handleSelectList = async (list) => {
    try {
      // Check that the list is in the array of available lists
      if (!availableLists.some((elem) => elem.value === list)) {
        return;
      }

      await axios.post("/user/games", { game_id: game.id, list });
      setGame({ ...game, user: { ...game.user, list } });
    } catch (err) {
      console.log(err);
    }
  };

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
              <div className="flex flex-col items-center md:flex-row">
                {/* Left column (game image) */}
                <div>
                  <div
                    className="relative w-56 text-center bg-center bg-no-repeat bg-cover rounded-lg shadow-md h-96"
                    style={{
                      backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.8)), url(${
                        game.cover ? game.cover.url : ""
                      })`,
                    }}
                  ></div>
                </div>
                {/* Right column (game info) */}
                <div className="mt-5 md:ml-10 md:mt-0 ">
                  {/* Name */}
                  <div className="text-2xl font-bold">{game.name}</div>
                  {/* Summary */}
                  <div className="mt-5 opacity-70">
                    <p>{game.summary}</p>
                  </div>
                  {/* Genres */}
                  <div className="flex items-center mt-5 space-x-3">
                    {game.genres &&
                      game.genres.map((genre, i) => (
                        <div className="px-3 py-2 font-semibold bg-gray-700 rounded-full" key={i}>
                          {genre.name}
                        </div>
                      ))}
                  </div>
                  {/* List */}
                  <div className="flex mt-5 space-x-3 md:mt-10 lg:mt-20">
                    {availableLists.map((list, i) => (
                      <div key={i}>
                        {game.user && game.user.list && game.user.list === list.value ? (
                          <div className="px-3 py-2 font-bold bg-purple-800 rounded-full">{list.name}</div>
                        ) : (
                          <Link to="#" onClick={() => handleSelectList(list.value)}>
                            <div className="px-3 py-2 font-semibold bg-purple-400 rounded-full">{list.name}</div>
                          </Link>
                        )}
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
