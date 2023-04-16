import { useRef, useContext } from 'react';
import styles from './MealItemForm.module.css';
import Input from '../../UI/input';
import CartContext from '../../../context/Cart-Context';

const MealItemForm = (props) => {
    const {addItem} = useContext(CartContext)
    const inputRef = useRef()
    
    const FormSubmitHandler = (event) =>{
        event.preventDefault();
        const mealItem = {
            id: props.mealData.id,
            name: props.mealData.name,
            price: props.mealData.price,
            amount: parseInt(inputRef.current.value)
        }
        addItem(mealItem)
    }

    return (
        <form className={styles['meal-form']} onSubmit={FormSubmitHandler}>
            <Input ref={inputRef} label='Amount' input={{
                id: 'amount_' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1',
            }} />
            <button className={styles['form-button']}>+ Add</button>
        </form>
    )
}

export default MealItemForm;
