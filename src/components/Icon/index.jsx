import { ReactComponent as back } from "./svgs/back.svg";
import { ReactComponent as arrowLeft } from "./svgs/arrowleft.svg";
import { ReactComponent as arrowRight } from "./svgs/arrowRight.svg";
import { ReactComponent as profile } from "./svgs/profile.svg";
import { ReactComponent as logout } from "./svgs/logout.svg";

const icons = {
  back,
  arrowLeft,
  arrowRight,
  profile,
  logout,
};
export const Icon = ({ name, ...props }) => {
  const Element = icons[name];
  return <Element {...props} />;
};
