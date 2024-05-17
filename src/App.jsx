import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="h-screen w-screen bg-cover bg-[url('./assets/bg.jpg')] flex items-center justify-center">
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default App;
