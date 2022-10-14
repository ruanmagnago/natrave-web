import { Icon, Input } from "~/components";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLocalStorage } from "react-use";
import { Navigate } from "react-router-dom";

const validationSchema = yup.object().shape({
  name: yup.string().required("Preencha seu nome."),
  username: yup.string().required("Preencha seu nome de usuário."),
  email: yup.string().email("email inválido").required("Informe seu e-mail."),
  password: yup.string().required("Digite uma senha."),
});

export const SingUp = () => {
  const [auth, setAuth] = useLocalStorage("auth", {});
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const res = await axios({
        method: "post",
        baseURL: import.meta.env.VITE_API_URL,
        url: "/users",
        data: values,
      });
      alert(JSON.stringify(res));
    },
    validationSchema,
  });

  if (auth?.user?.id) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return (
    <div>
      <header className="p-4 border-red-300 border-b-2">
        <div className="container max-w-xxl flex justify-center ">
          <img src="/logo/logo-fundo-branco.svg" className="w-40" />
        </div>
      </header>

      <main className="container max-w-5xl p-4">
        <div className="flex flex-row p-4 space-x-4 items-center">
          <a href="/">
            <Icon name="back" className="h-6" />
          </a>
          <h2 className="text-xl font-bold">Crie sua conta</h2>
        </div>
        <form className="p-4 space-y-6" onSubmit={formik.handleSubmit}>
          <Input
            name="name"
            label="Seu nome"
            type="text"
            placeholder="Digite seu nome"
            error={formik.touched.name && formik.errors.name}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Input
            type="text"
            name="username"
            label="Seu nome de usuário"
            placeholder="Digite um nome de usuário"
            error={formik.touched.username && formik.errors.username}
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Input
            type="email"
            name="email"
            label="Seu e-email"
            placeholder="Digite seu e-mail"
            error={formik.touched.email && formik.errors.email}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Input
            type="password"
            name="password"
            label="Sua senha"
            placeholder="Digite sua senha"
            error={formik.touched.password && formik.errors.password}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button
            type="submit"
            className="w-full text-white-500 bg-red-500 px-8 py-3 rounded-xl disabled:opacity-50"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            {formik.isSubmitting ? "Carregando..." : "Criar minha conta"}
          </button>
        </form>
      </main>
    </div>
  );
};
