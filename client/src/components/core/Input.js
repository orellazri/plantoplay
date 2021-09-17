function Input(props) {
  let classes = "w-full px-3 py-2 leading-tight text-gray-300 bg-gray-600 rounded shadow-md appearance-none focus:outline-none";

  if (props.className) {
    classes += " " + props.className;
  }

  return <input {...props} className={classes} />;
}

export default Input;
