import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from "./../../context/Cart-Context";
import { useContext, useState } from 'react';
import Checkout from './Checkout';
import useHttp from '../../hooks/use-http';
import Spinner from '../../assets/spinner-svg';

const Cart = () => {
    const [orderReferenceId, setOrderReferenceId] = useState(null);
    const [userInfoForm, setUserInfoForm] = useState(false)
    const [confirmInfoForm, setConfirmInfoForm] = useState(false)
    const {items, totalAmount, hideCart, addItem, removeItem, resetCart} = useContext(CartContext);
    const {isError, isLoading, fetchData: sendData} =  useHttp();
    
    const confirmResultForm = () => {
        setConfirmInfoForm(true);
        setUserInfoForm(false);
    }

    const orderSubmitHandler = () => {
        setUserInfoForm(true);
    }

    const getOrderReferenceId = (id) => {
        setOrderReferenceId(id);
        resetCart();
    }
    
    let cartContent;
    if(items.length === 0 && !confirmInfoForm){
        cartContent = 
            <div className={styles['empty-cart']}>
                <p>Cart is empty</p>
                <button onClick={hideCart}>Add Meals</button>
            </div>
        
    }else if(confirmInfoForm){
        cartContent = 
            <>
                {isLoading && <div className={styles['spinner-div']}>
                <Spinner color={"#8a2b06"}/>
                <p>Loading...</p>
                </div>}
                {isError.isError && <div className={styles['error-occurred']}>Error: {isError.message} </div>}
                {!isLoading && !isError.isError && <div className={styles['order-confirmed']}>
                    <h1>THANK YOU FOR YOUR PURCHASE</h1>
                    <p>Your order number is: <span>{orderReferenceId.name}</span></p>
                    <button className={styles.button} onClick={hideCart}>Continue Shopping</button>
                </div>}
            </>
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
                {userInfoForm && <Checkout items={items} totalAmount={totalAmount} hideCart={hideCart} sendData={sendData} confirmResultForm={confirmResultForm} getOrderReferenceId={getOrderReferenceId}/>}
                {!userInfoForm && <div className={styles.actions}>
                    <button className={styles['button--alt']} onClick={hideCart}> Close </button>
                    <button className={styles.button} onClick={orderSubmitHandler}>Order</button>
                </div>}
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