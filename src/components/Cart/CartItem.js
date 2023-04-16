import styles from './CartItem.module.css';

const CartItem = (props) => {
    const price = `$${props.price}`;
    const addItemHandler = () =>{
        const mealItem = {
            id: props.id,
            name: props.name,
            price: props.price,
            amount: parseInt(1)
        }
        props.onAdd(mealItem)
    }
    const removeItemHandler = () => {
        props.onRemove(props.id)
    }

    return (
        <li className={styles['cart-item']}>
            <div>
                <h2>{props.name}</h2>
                <div className={styles.summary}>
                    <span className={styles.price}>{price}</span>
                    <span className={styles.amount}>x {props.amount}</span>
                </div>
            </div>
            <div className={styles.actions}>
                <button onClick={removeItemHandler}>−</button>
                <button onClick={addItemHandler}>+</button>
            </div>
        </li>
    );
}

export default CartItem;