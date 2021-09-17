import { Link as RouterLink } from "react-router-dom";

function Link({ to, primary, className, onClick, children }) {
  className += primary ? " text-purple-500" : "";

  return (
    <RouterLink to={to} className={`${className}`} onClick={onClick}>
      {children}
    </RouterLink>
  );
}

export default Link;
