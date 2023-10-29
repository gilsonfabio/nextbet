import Dashboard from "./components/Dashboard";
import Modalidades from "./components/Modalidades";
import SliderShow from "./components/SliderShow";

export default function Home() {
  return (
    <div className="w-full h-full flex-col items-center justify-center ">
      <SliderShow />
      <div className="w-full h-screen flex flex-col bg-slate-200 items-center justify-center px-28 ">
        <Dashboard />       
      </div>
    </div>
    
  )
}
