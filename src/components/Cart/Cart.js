import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import Card from '../UI/Card';
import CartItem from './CartItem';

const Cart = () => {
    const items = [];
    return (
        <Modal>
            <Card>
                <ul>
                    {
                        items.map((item) => {
                            return <CartItem key={item.id}/>
                        })
                    }
                </ul>
            </Card>
        </Modal>
    )
}

export default Cart;