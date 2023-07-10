import { useEffect } from "react";
import { instance } from "../../api/config";

export default function Home() {
  useEffect(() => {
    instance.get("/products").then((res) => console.log(res.data));
  }, []);
  return (
    <div>
      {console.log("Component")}
      Home
    </div>
  );
}
