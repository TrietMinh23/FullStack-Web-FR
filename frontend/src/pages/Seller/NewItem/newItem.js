import LeftNav from "../components/LeftNav";
import Navbar from "../components/NavBar";
import { ThemeProvider } from "@material-tailwind/react";
import NewProductForm from "./NewForm";

export default function NewItem() {
  return (
    <ThemeProvider>
      <div className="App bg-white h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-row">
          <LeftNav />
          <div className="flex-1">
            <NewProductForm/>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
