import React,{useEffect, useState} from "react";
import classes from './AvailableMeals.module.css';
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals= ()=>{
  const [meals, setMeals]=useState([]);
  const [isLoading, setIsLoading]=useState(false);
  const[error, setError]=useState(null);

  useEffect(()=>{
    setIsLoading(true);
    setError(null);
   
    const fetchMeals = async () =>{
      
      const response= await fetch('https://rrrrrr-c078e-default-rtdb.firebaseio.com/meals.json');
      if(!response.ok){
        throw new Error('Something went wrong');
      }
      const data= await response.json();

      const loadMeals=[];

      for(const key in data){
        loadMeals.push({
          id: key,
          description: data[key].description,
          name: data[key].name,          
          price: data[key].price,
        });
      }
    
      setMeals(loadMeals);
      setIsLoading(false);
   
      
    };
  
    fetchMeals().catch((error)=> {
      setIsLoading(false);
      setError(error.message);
    }); 
      
   
    },[])

    if(isLoading){
      return (<section className={classes.MealsLoading} >
        <p>Loading ...</p>
      </section>);
    }
    if(error){
      return (<section className={classes.MealsError} > 
                <p>{error}</p>
             </section>);
    }
  

    const mealsList= meals.map(meal=> <MealItem 
      id={meal.id}
      key={meal.id} 
      name={meal.name} 
      description={meal.description}
      price={meal.price}
      />);

  return (
           <section className={classes.meals}>
            <Card>
            <ul>           
             {mealsList}
            </ul>
            </Card>
           </section>
  );
};
export default AvailableMeals;