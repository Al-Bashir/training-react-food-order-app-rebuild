import styles from './CartButton.module.css';
import CartIcon from './CartIcon';
import CartContext from "./../../context/Cart-Context";
import { useContext, useEffect } from 'react';


const CartButton = () => {
    const { items, isCartChange, setIsCartChange, showCart } = useContext(CartContext);

    useEffect(() => {
        const identifier = setTimeout(() => {
            setIsCartChange(false);
        }, 300);
        return () => clearTimeout(identifier);
    }, [isCartChange, setIsCartChange])

    const cartButtonHandler = () => {
        showCart();
    }

    const animation = isCartChange? styles['animate-cart-button'] : null;

    return(
        <button className={`${styles.cartButton} ${animation}`} onClick={cartButtonHandler}>
            <span className={styles.icon}> <CartIcon /> </span>
            <span> Your Cart </span>
            <span className={styles.badge}> {items.length} </span>
        </button>
    )
}

export default CartButton;