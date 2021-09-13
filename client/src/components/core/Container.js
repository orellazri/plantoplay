function Container({ children }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-5">{children}</div>
    </div>
  );
}

export default Container;
