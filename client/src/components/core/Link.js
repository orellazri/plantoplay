import { Link as RouterLink } from "react-router-dom";

function Link({ to, children }) {
  return (
    <RouterLink to={to} className="text-purple-500">
      {children}
    </RouterLink>
  );
}

export default Link;
