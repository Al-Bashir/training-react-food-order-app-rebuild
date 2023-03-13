import styles from './Modal.module.css';
import ReactDOM from 'react-dom';

const BackDrop = () => {
    return (
        <div className={styles['back-drop']}></div>
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