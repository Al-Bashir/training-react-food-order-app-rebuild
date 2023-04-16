import styles from './Modal.module.css';
import ReactDOM from 'react-dom';
import { useContext } from 'react';
import CartContext from '../../context/Cart-Context';

const BackDrop = () => {
    const { hideCart } = useContext(CartContext);
    return (
        <div className={styles['back-drop']} onClick={hideCart}></div>
    )
}

const ModalOverlay = (props) => {
    return (
        <div className={styles.modal}>
            <section>{props.children}</section>
        </div>
    )
}

const Modal = (props) => {
    const portalElement = document.getElementById('overlays');
    return (
        <>
            {
                ReactDOM.createPortal(<BackDrop />, portalElement)
            }
            {
                ReactDOM.createPortal(<ModalOverlay> {props.children} </ModalOverlay>, portalElement)
            }
        </>
    )
}

export default Modal;