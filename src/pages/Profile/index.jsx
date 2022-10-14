import { useEffect, useState } from "react";
import { Icon, Card, DateSelect } from "~/components";
import { useLocalStorage, useAsyncFn } from "react-use";
import { useParams, useNavigate } from "react-router-dom";
import { format, formatISO } from "date-fns";
import axios from "axios";

export const Profile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [auth, setAuth] = useLocalStorage("auth", {});
  const [currentDate, setDate] = useState(formatISO(new Date(2022, 10, 20)));
  const logout = () => {
    setAuth({});
    navigate("/login");
  };

  const [user, fetchHunches] = useAsyncFn(async () => {
    const res = await axios({
      method: "get",
      baseURL: import.meta.env.VITE_API_URL,
      url: `/hunches/${params.username}`,
    });

    const hunches = res.data.hunches.reduce((acc, hunch) => {
      acc[hunch.gameId] = hunch;
      return acc;
    }, {});
    return {
      ...res.data,
      hunches,
    };
  });

  const [games, fetchGames] = useAsyncFn(async (params) => {
    const res = await axios({
      method: "get",
      baseURL: import.meta.env.VITE_API_URL,
      url: "/games",
      params,
    });
    return res.data;
  });

  const isLoading = games.loading || user.loading;
  const hasError = games.error || user.error;
  const isDone = !isLoading && !hasError;

  useEffect(() => {
    fetchHunches();
  }, []);

  useEffect(() => {
    fetchGames({ matchTime: currentDate });
  }, [currentDate]);

  return (
    <div>
      <header className="p-4 flex justify-center bg-red-500 text-white-500">
        {auth?.user?.id && (
          <div className="container max-w-5xl p-4 flex justify-between">
            <img src="\logo\logo-fundo-vermelho.svg" className="w-28 md:w-40" />
            <button onClick={logout}>
              <Icon name="logout" className="w-8" />
            </button>
          </div>
        )}
      </header>
      <main className="space-y-6">
        <section
          id="header"
          className="p-4 flex justify-center bg-red-500 text-white-500"
        >
          <div className="container max-w-5xl space-y-2">
            <a href="/dashboard">
              <Icon name="back" className="w-10" />
            </a>
            <h3 className="text-2xl">{user.value?.name} </h3>
          </div>
        </section>

        <section id="content" className="container m-w-3xl p-4 space-y-4">
          <h2 className="text-red-500 font-bold text-xl">Seus palpites</h2>
          <DateSelect currentDate={currentDate} onChange={setDate} />
          <div className="flex flex-col items-center space-y-4">
            {isLoading && "Carregando jogos..."}
            {hasError && "Ops! Algo deu errado."}
            {isDone &&
              games.value?.map((game) => (
                <Card
                  key={game.id}
                  gameId={game.id}
                  homeTeam={game.homeTeam}
                  awayTeam={game.awayTeam}
                  Match={format(new Date(game.matchTime), "H:mm")}
                  homeTeamScore={
                    user.value?.hunches[game.id]?.homeTeamScore || ""
                  }
                  awayTeamScore={
                    user.value?.hunches[game.id]?.awayTeamScore || ""
                  }
                  disabled={true}
                />
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};
