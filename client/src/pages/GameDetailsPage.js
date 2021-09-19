import axios from "axios";
import { useState, useEffect } from "react";
import Alert from "../components/core/Alert";

import { availableLists } from "../utils";
import Spinner from "../components/core/Spinner";
import Link from "../components/core/Link";
import { CheckCircleIcon } from "@heroicons/react/outline";

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

    fetchGame();
  }, [match.params.slug]);

  const handleSelectList = async (list) => {
    try {
      // Check that the list is in the array of available lists
      if (!availableLists.some((elem) => elem.value === list)) {
        return;
      }

      // Check if the chosen list is the same as the game's list to delete it
      if (game.user && game.user.list && list === game.user.list) {
        setGame({ ...game, user: {} });
        await axios.delete("/user/games", { data: { game_id: game.id } });
        return;
      }

      setGame({ ...game, user: { ...game.user, list } });
      await axios.post("/user/games", { game_id: game.id, list });
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
              <div className="relative flex flex-col items-center md:items-start md:flex-row">
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
                  <div className="flex items-center mt-10 space-x-3">
                    {game.genres &&
                      game.genres.map((genre, i) => (
                        <div className="px-4 py-2 font-semibold bg-gray-700 rounded-full" key={i}>
                          {genre.name}
                        </div>
                      ))}
                  </div>
                  {/* List */}
                  <div className="flex flex-col mt-5 md:absolute md:mt-0 md:bottom-0">
                    <span className="mb-3 text-xl font-light">Play Status:</span>
                    <div className="flex items-center space-x-3">
                      {availableLists.map((list, i) => (
                        <Link key={i} to="#" onClick={() => handleSelectList(list.value)}>
                          <div
                            className={
                              `flex px-3 py-2 font-semibold rounded-md hover:opacity-90 ` +
                              (game.user && game.user.list && game.user.list === list.value && ` font-bold`)
                            }
                            style={{ backgroundImage: `linear-gradient(to bottom, ${list.colors[0]}, ${list.colors[1]})` }}
                          >
                            {/* List check icon */}
                            {game.user && game.user.list && game.user.list === list.value && (
                              <div className="pr-2">
                                <CheckCircleIcon className="w-6 h-6" />
                              </div>
                            )}
                            <span className="filter drop-shadow-md">{list.name}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
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
