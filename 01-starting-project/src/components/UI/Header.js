import React from "react";
import classes from './Header.module.css';
import mealsImages from '../../assets/meals.jpg';
import HeaderCartButton from "../Layout/HeaderCartButton";

const Header=(props)=>{

return<React.Fragment>
    <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
    </header>
    <div className={classes['main-image']}>
        <img src={mealsImages} alt='A table full of delicious food!'/>
    </div>
    
    </React.Fragment>

};
export default Header;