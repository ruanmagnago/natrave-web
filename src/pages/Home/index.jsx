import { useLocalStorage } from "react-use";
import { Navigate } from "react-router-dom";

export function Home() {
  const [auth] = useLocalStorage("auth", {});
  if (auth?.user?.id) {
    return <Navigate to="/dashboard" replace={true} />;
  }
  return (
    <div className="h-auto bg-red-700 text-white-500 p-4 flex flex-col items-center space-y-6 ">
      <header className="container-xxl flex justify-center max-w-4xl p-4 md: max-h-320 max-w-320">
        <img src="/logo/logo-fundo-vinho.svg" className="w-40" />
      </header>

      <div className="container-xxl flex-1 p-4 flex flex-col itens-center md:flex-row">
        <div className="md:flex-1 flex justify-center">
          <img src="/logo/img.png" className="w-full" />
        </div>

        <div className="flex flex-col justify-center space-y-6 md:flex-1">
          <h1 className="font-bold text-3xl text-center justify-center md:text-left">
            Dê o seu palpite na Copa do Mundo do Catar 2022!{" "}
          </h1>
          <a
            href="/signup"
            className="text-red-700 bg-white-500 text-xl px-8 py-4 rounded-xl"
          >
            Criar minha conta
          </a>
          <a
            href="/login"
            className="text-white-500 border border-white-500 text-xl px-8 py-4 rounded-xl"
          >
            Fazer login
          </a>
        </div>
      </div>
    </div>
  );
}
