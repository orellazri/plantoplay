import { useState, useEffect } from "react";
import axios from "axios";

import { availableLists } from "../utils";
import Spinner from "../components/core/Spinner";

function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);

  useEffect(() => {
    // Fetch user's games
    const fetchUserGames = async () => {
      try {
        const { data } = await axios.get("/user/games");
        console.log(data);
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
          <div className="flex flex-col space-y-4">
            {availableLists.map((list, i) => (
              <div key={i} className="flex flex-col space-y-2">
                <span className="text-xl font-bold">{list.name}</span>
                {/* Games in list */}
                <div className="flex">
                  {games
                    .filter((elem) => elem.list === list.value)
                    .map((game, j) => (
                      <div key={j} className="">
                        {game.name}
                      </div>
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
