import { useRef } from 'react';
import styles from './MealItemForm.module.css';
import Input from '../../UI/input';

const MealItemForm = (props) => {
    const inputRef = useRef()
    const FormSubmitHandler = (event) =>{
        console.log(inputRef.current.value)
        event.preventDefault();
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
