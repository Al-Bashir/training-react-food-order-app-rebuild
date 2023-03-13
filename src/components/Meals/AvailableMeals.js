import { useState, useEffect } from 'react';
import styles from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem'
import useHttp from '../../hooks/use-http';
import Card from '../UI/Card';


const AvailableMeals =  () => {
    const [meals, setMeals] = useState(null);
    const {isError, isLoading, fetchData} = useHttp();

    useEffect(() => {
        const fetchMealsHandler = (meals) => {
            setMeals(meals);
        }
        fetchData(fetchMealsHandler ,'https://training-react-post-request-default-rtdb.firebaseio.com/DUMMY_MEALS.json');
    }, [fetchData])

    const mealsArray = [];
    for (const meal in meals) {
        mealsArray.push(<MealItem key={meal} mealData={meals[meal]}></MealItem>)
    }

    return (
        <>
    {!isLoading && <section className={styles['section-meals']}>
                <Card className={'meals-card'}>
                    <ul>
                        {mealsArray}
                    </ul>
                </Card>
            </section>}
        </>
    )
}

export default AvailableMeals;