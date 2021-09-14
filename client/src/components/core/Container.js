function Container({ children }) {
  return (
    <div className="min-h-screen text-white bg-gray-900">
      <div className="container p-5 pt-10 mx-auto max-w-7xl">{children}</div>
    </div>
  );
}

export default Container;
