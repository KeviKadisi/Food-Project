
import {useRef, useState} from 'react';
import classes from './Checkout.module.css';

const isEmpty= value => value.trim() === '';
const isNotFiveChars= value=> value.trim().length !== 5;

const Checkout =(props)=>{

    const[formInputsValidity, setFormInputsValidity]=useState({
       name:true,
       street: true,
       city: true,
       postalCode: true
    });

const nameInputRef= useRef();
const streetInputRef= useRef();
const postalCodeInputRef= useRef();
const cityInputRef= useRef();

 const confirmHandler = (event) =>{
    event.preventDefault();
    
    const enteredName= nameInputRef.current.value;
    const enteredStreet= streetInputRef.current.value;
    const enteredPostalCode= postalCodeInputRef.current.value;
    const enteredCity= cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = !isNotFiveChars(enteredPostalCode);

    setFormInputsValidity({
        name:enteredNameIsValid,
        street: enteredStreetIsValid,
        city:enteredCityIsValid,
        postalCode: enteredPostalCodeIsValid
    });

    const formIsValid= 
     enteredNameIsValid && 
     enteredStreetIsValid &&
     enteredCityIsValid && 
     enteredPostalCodeIsValid;

    if(!formIsValid){
        return;

    }
     props.onConfirm({
        name:enteredName,
        street: enteredStreet,
        city:enteredCity,
        postalCode: enteredPostalCode,
     });

 };

 const nameContolClasses= `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`;
 const streetContolClasses= `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`;
 const postalCodeContolClasses= `${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`;
 const cityContolClasses= `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`;

return <form className={classes.form}  onSubmit={confirmHandler} >
    <div className={nameContolClasses}>
        <label htmlFor='name' >Your Name</label>
        <input type='text' id='name'  ref={nameInputRef}/>
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
    </div>
    <div className={streetContolClasses}>
        <label htmlFor='street' >Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
    </div>
    <div className={postalCodeContolClasses}>
        <label htmlFor='postal' >Postal</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && <p>Please enter a valid postal code (5 characters long)!</p>}
    </div>
    <div className={cityContolClasses}>
        <label htmlFor='city' >City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
    </div>
    <div className={classes.actions}>
        <button type='button' onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    
</form>
};
export default Checkout;