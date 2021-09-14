import { Link as RouterLink } from "react-router-dom";

function Link({ to, className, onClick, children }) {
  return (
    <RouterLink to={to} className={`text-purple-500 ${className}`} onClick={onClick}>
      {children}
    </RouterLink>
  );
}

export default Link;
