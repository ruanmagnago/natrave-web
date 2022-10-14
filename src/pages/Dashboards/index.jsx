import { Icon, Card, DateSelect } from "~/components";
import axios from "axios";
import { useLocalStorage, useAsyncFn } from "react-use";
import { Navigate } from "react-router-dom";
import { format, formatISO } from "date-fns";
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const [currentDate, setDate] = useState(formatISO(new Date(2022, 10, 20)));
  const [auth] = useLocalStorage("auth", {});
  if (!auth?.user?.id) {
    return <Navigate to="/" replace={true} />;
  }

  const [hunches, fetchHunches] = useAsyncFn(async () => {
    const res = await axios({
      method: "get",
      baseURL: import.meta.env.VITE_API_URL,
      url: `/hunches/${auth.user.username}`,
    });
    const hunchesmap = res.data.hunches.reduce((acc, hunch) => {
      acc[hunch.gameId] = hunch;
      return acc;
    }, {});
    return hunchesmap;
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

  const isLoading = games.loading || hunches.loading;
  const hasError = games.error || hunches.error;
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
        <div className="container max-w-5xl p-4 flex justify-between">
          <img src="\logo\logo-fundo-vermelho.svg" className="w-28 md:w-40" />
          <a href={`/${auth?.user?.username}`}>
            <Icon name="profile" className="w-10" />
          </a>
        </div>
      </header>
      <main className="space-y-6">
        <section
          id="header"
          className="p-4 flex justify-center bg-red-500 text-white-500"
        >
          <div className="container max-w-5xl space-y-2">
            <span>Olá {auth.user.name}</span>
            <h3 className="text-2xl">Qual é o seu palpite?</h3>
          </div>
        </section>

        <section id="content" className="p-4 space-y-4">
          <DateSelect currentDate={currentDate} onChange={setDate} />
          <div className="flex flex-col items-center space-y-4">
            {isLoading && "Carregando jogos..."}
            {games.error && "Ops! Algo deu errado."}
            {isDone &&
              games.value?.map((game) => (
                <Card
                  key={game.id}
                  gameId={game.id}
                  homeTeam={game.homeTeam}
                  awayTeam={game.awayTeam}
                  Match={format(new Date(game.matchTime), "H:mm")}
                  homeTeamScore={hunches.value?.[game.id]?.homeTeamScore || ""}
                  awayTeamScore={hunches.value?.[game.id]?.awayTeamScore || ""}
                />
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};
