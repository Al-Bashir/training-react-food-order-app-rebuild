import styles from './Meals.module.css';
import MealsSummary from './MealsSummary';
import AvailableMeals from './AvailableMeals';

const Meals = () => {
    return(
        <>
            <MealsSummary />
            <AvailableMeals />
        </>
    )
}

export default Meals;