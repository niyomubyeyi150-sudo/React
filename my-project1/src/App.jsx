import { useEffect, useState } from "react";
import Popup from "./components/Popup"
function App() {
const[count, setCount]=useState(0);
//Destructuring
const[isPopupOpen, setIsPopupOpen]= useState(false);
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true)
useEffect(() => {
    console.log("Component Loaded");
  }, []);

  useEffect(() => {

    const timer = setTimeout(() => {
      fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {console.log(err);
        setLoading(false);
      });
    }, 2000);

    return () => clearTimeout(timer);

  }, []);

  if(loading){
    return (
      <>
      <p>Loading</p>
      </>
    )
  }

  return (
    <>
    <div>
      <h2>{count}</h2>
      <button onClick={() => setCount(count +1)}>increase</button>
      <button onClick={() => setCount(count -1)}>decrease</button>
      <div className="App" style={{padding:'50px', textAlign:'center'}}>
        <h1>React Popup Example</h1>
        <button onClick={() => setIsPopupOpen(!isPopupOpen)}>
          Open Popup
        </button>
         <div>
        {products.map(product =>(
          <h3 key={product.id}>{product.title}
          </h3>          
        ))}
      </div>
<Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
  <h2>Hello From the Pop-out</h2>
  <p>This is a dynamic content passed as the popup component</p>
</Popup>
      </div>
      </div>
    </>
     
  )
}

export default App
