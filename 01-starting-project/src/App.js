import React,{useState} from "react";
import Header from "./components/UI/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./components/store/CartProvider";

function App() {

  const [event, setEvent]=useState(false);

  const showCartHandler=()=>{
    setEvent(true);
  };

  const hideCartHandler=()=>{
    setEvent(false);
  };


  return ( 
           <CartProvider>
            {event && <Cart onHideCart={hideCartHandler}/>}
               <Header onShowCart={showCartHandler}/> 
               <main>
               <Meals/>
               </main>
           </CartProvider>
  );
}

export default App;
