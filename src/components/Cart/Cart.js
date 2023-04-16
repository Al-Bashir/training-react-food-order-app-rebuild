import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from "./../../context/Cart-Context";
import { useContext } from 'react';

const Cart = () => {
    const {items, totalAmount, hideCart, addItem, removeItem} = useContext(CartContext);
    let cartContent;
    
    if(items.length === 0){
        cartContent = 
            <div className={styles['empty-cart']}>
                <p>Cart is empty</p>
                <button onClick={hideCart}>Add Meals</button>
            </div>
        
    }else{
        cartContent = (
            <>
                <ul className={styles['ul-style']}>
                    {
                        items.map((item) => {
                            return <CartItem key={item.id} id={item.id} name={item.name} price={item.price} amount={item.amount} onRemove={removeItem} onAdd={addItem}/>
                        })
                    }
                </ul>
                <div className={styles.total}>
                    <span>Total Amount</span>
                    <span>${Number(totalAmount).toFixed(2)}</span>
                </div>
                <div className={styles.actions}>
                    <button className={styles['button--alt']} onClick={hideCart}> Close </button>
                    <button className={styles.button}>Order</button>
                </div>
            </>
        ) 
    }

    return (
        <Modal>
            {cartContent}
        </Modal>
    )
}

export default Cart;