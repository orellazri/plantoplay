import { useState, useEffect } from "react";
import axios from "axios";

import { availableLists } from "../utils";
import Spinner from "../components/core/Spinner";
import Link from "../components/core/Link";

function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);

  useEffect(() => {
    // Fetch user's games
    const fetchUserGames = async () => {
      try {
        const { data } = await axios.get("/user/games");
        setGames(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserGames();
  }, []);

  return (
    <>
      {loading && (
        <div className="flex justify-center ">
          <Spinner />
        </div>
      )}
      {!loading && (
        <>
          {/* Lists */}
          <div className="flex flex-col space-y-10">
            {availableLists.map((list, i) => (
              <div key={i} className="flex flex-col space-y-2">
                <span className="text-xl font-bold">{list.name}</span>
                {/* Games in list */}
                <div className="flex space-x-4 overflow-x-scroll hide-scroll-bar">
                  {games
                    .filter((elem) => elem.list === list.value)
                    .map((game, j) => (
                      <Link to={`/game/${game.info.slug}`} key={j}>
                        <div
                          className="relative w-40 text-center bg-center bg-no-repeat bg-cover rounded-lg shadow-md h-72"
                          style={{
                            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.8)), url(${
                              game.info.cover ? game.info.cover.url : ""
                            })`,
                          }}
                        >
                          <div className="absolute w-full px-1 text-lg font-bold bottom-5">{game.info.name}</div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default DashboardPage;
