import Navbar from "./components/NavBar";
import ShoppingList from "./components/ShoppingList";

export default function Home() {
  return (
    <div className="bg-light-silver">
      <Navbar></Navbar>
      <ShoppingList></ShoppingList>
    </div>
  );
}
