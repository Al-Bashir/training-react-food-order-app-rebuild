import styles from './Card.module.css';

const Card = (props) => {
    const classes = props.className ? `${styles.card} ${styles[props.className]}` : `${styles.card}`;

    return <div className={styles.card}>{props.children}</div>
}

export default Card;