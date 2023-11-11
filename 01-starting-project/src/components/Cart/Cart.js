import React,{useContext, useState} from "react";
import classes from './Cart.module.css';
import Modal from "../UI/Modal";
import CartContext from "../store/cart-context";
import CartItem from "./CartItem/CartItem";
import Checkout from "./CartItem/Checkout";

const Cart=(props)=>{
 const[isCheckout, setIsCheckout]=useState(false);
 const [isSubmitting, setIsSubmitting]=useState(false);
 const [didSubmit, setDidSubmit]=useState(false);

    const cartCtx= useContext(CartContext);
    const totalAmount= `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems= cartCtx.items.length > 0 ;

    const cartItemRemoveHandler= id =>{
          cartCtx.removeItem(id);
    };
    const cartItemAddHandler= item =>{
            cartCtx.addItem({...item,amount:1});
    };
    const orederHandler = () =>{
        setIsCheckout(true);

    };
    
    const cartItems =<ul className={classes['cart-items']}>
        {cartCtx.items.map((item => 
         <CartItem 
         key={item.id} 
         name={item.name} 
         amount={item.amount} 
         price={item.price} 
         onRemove={cartItemRemoveHandler.bind(null, item.id)}
         onAdd={cartItemAddHandler.bind(null, item)}
         />))}
         </ul>;

const modalAction= (
    <div className={classes.actions}>
    <button onClick={props.onHideCart} className={classes['button--alt']}>Close</button>
    {hasItems && <button className={classes.button} onClick={orederHandler} >Order</button>}
</div>
);

const submitOrderHandler = async (userData)=>{
    setIsSubmitting(true);
 await fetch('https://rrrrrr-c078e-default-rtdb.firebaseio.com/orders.json', {
    method: "POST",
    body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
    })  
});
setIsSubmitting(false);
setDidSubmit(true);
cartCtx.clearCart();
};
const cartModalContent = <React.Fragment>  
    {cartItems}
<div className={classes.total}>
    <span>Total Amount</span>
    <span>{totalAmount}</span>
</div>
{isCheckout &&<Checkout onConfirm={submitOrderHandler}  onClose={props.onHideCart}/>}
{!isCheckout && modalAction}
</React.Fragment>

const isSubmittingModalContent = <p>Sending order data ...</p>;
const didSubmitModelContent= <React.Fragment><p>Successfully send the order!</p>
  <div className={classes.actions}>
    <button  onClick={props.onHideCart} className={classes.button}>Close</button>
    </div>
</React.Fragment> 

return (<Modal onClick={props.onHideCart}>
     {!isSubmitting && !didSubmit && cartModalContent}
     {isSubmitting && isSubmittingModalContent}
     {!isSubmitting &&  didSubmit && didSubmitModelContent}
</Modal>);
};
export default Cart;