import styles from './CartButton.module.css';
import CartIcon from './CartIcon';

const CartButton = () => {
    const cartButtonHandler = () => {
        // to be codded
    }

    return(
        <button className={styles.cartButton} onClick={cartButtonHandler}>
            <span className={styles.icon}> <CartIcon /> </span>
            <span> Your Cart </span>
            <span className={styles.badge}> 0 </span>
        </button>
    )
}

export default CartButton;