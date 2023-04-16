import styles from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = (props) => {
    return (
        <li className={styles['meal-item']}>
            <div>
                <h3>{props.mealData.name}</h3>
                <div className={styles['meal-description']}>{props.mealData.description}</div>
                <div className={styles['meal-price']}>${props.mealData.price}</div>
            </div>
            <div>
                <MealItemForm mealData={props.mealData} />
            </div>
        </li>
    )
}

export default MealItem;