import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLocalStorage } from "react-use";

export const Card = ({
  disabled,
  gameId,
  homeTeam,
  awayTeam,
  homeTeamScore,
  awayTeamScore,
  Match,
}) => {
  const [auth] = useLocalStorage("auth");
  const validationSchema = yup.object().shape({
    homeTeamScore: yup.string().required(""),
    awayTeamScore: yup.string().required(""),
  });

  const formik = useFormik({
    onSubmit: (values) => {
      axios({
        method: "post",
        baseURL: import.meta.env.VITE_API_URL,
        url: "/hunches",
        headers: {
          authorization: `Bearer ${auth.acessToken}`,
        },
        data: { ...values, gameId },
      });
    },
    initialValues: {
      homeTeamScore,
      awayTeamScore,
    },
    validationSchema,
  });
  return (
    <div className="rounded-xl border border-gray-300 p-4 text-center space-y-4">
      <span className="text-sm md:text-base text-gray-700 font-bold">
        {Match}
      </span>
      <form className="flex space-x-4 justify-center items-center">
        <span className="uppercase">{homeTeam}</span>
        <img src={`/bandeiras/${homeTeam}.png`} />
        <input
          name="homeTeamScore"
          className="self-stretch bg-red-300/20 w-16 text-red-700 text-center"
          type="number"
          value={formik.values.homeTeamScore}
          onChange={formik.handleChange}
          onBlur={formik.handleSubmit}
          disabled={disabled}
        />
        <span className=" text-red-700 font-bold">X</span>
        <input
          name="awayTeamScore"
          className="self-stretch bg-red-300/20 w-16 text-red-700 text-center"
          type="number"
          value={formik.values.awayTeamScore}
          onChange={formik.handleChange}
          onBlur={formik.handleSubmit}
          disabled={disabled}
        />
        <img src={`/bandeiras/${awayTeam}.png`} />
        <span className="uppercase">{awayTeam}</span>
      </form>
    </div>
  );
};
