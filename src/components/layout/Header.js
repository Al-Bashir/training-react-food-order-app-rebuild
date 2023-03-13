import styles from './Header.module.css';
import Logo from './Logo';
import CartButton from './CartButton';
import imageSource from '../../assets/meals.jpg'



const Header = () => {
    return(
        <>
            <header className={styles.header}>
                <Logo />
                <CartButton />
            </header>
            <div className={styles["main-image"]}>
                <img src={imageSource} alt="image display delicious food"/>
            </div>
        </>
    )
}

export default Header;