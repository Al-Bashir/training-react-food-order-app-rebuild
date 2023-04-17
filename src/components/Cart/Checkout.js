import styles from './Checkout.module.css';
import useValidation from '../../hooks/use-validation';



const isNotEmpty = (value) => value.trim() !== '';
const isNumberOnly = (value) => value.trim() !== '' && /^\d+$/.test(value) && parseInt(value) !== 0;

const Checkout = (props) => {
  const {checkValidity: nameValidity,
        reset: nameReset, 
        hasError: nameHasError,
        enteredValue: enteredName,
        enteredValueChangeHandler: enteredNameChangeHandler,
        touchChangeHandler: touchNameChangeHandler } = useValidation(isNotEmpty);
  const {checkValidity: streetValidity,
        reset: streetReset, 
        hasError: streetHasError,
        enteredValue: enteredStreet,
        enteredValueChangeHandler: enteredStreetChangeHandler,
        touchChangeHandler: touchStreetChangeHandler } = useValidation(isNotEmpty);
  const {checkValidity: postalValidity,
        reset: postalReset, 
        hasError: postalHasError,
        enteredValue: enteredPostal,
        enteredValueChangeHandler: enteredPostalChangeHandler,
        touchChangeHandler: touchPostalChangeHandler } = useValidation(isNumberOnly);
  const {checkValidity: cityValidity,
        reset: cityReset, 
        hasError: cityHasError,
        enteredValue: enteredCity,
        enteredValueChangeHandler: enteredCityChangeHandler,
        touchChangeHandler: touchCityChangeHandler } = useValidation(isNotEmpty);

  const nameClasses = nameHasError ? `${styles.invalid} ${styles.control}` : styles.control;
  const streetClasses = streetHasError ? `${styles.invalid} ${styles.control}` : styles.control;
  const postalClasses = postalHasError ? `${styles.invalid} ${styles.control}` : styles.control;
  const cityClasses = cityHasError ? `${styles.invalid} ${styles.control}` : styles.control;
  
  const formValidity = nameValidity && streetValidity && postalValidity && cityValidity;
  
  const confirmHandler = (event) => {
    if(!formValidity){
      return;
    }
    event.preventDefault();
    const orderFullInfo = {
      id: Math.random().toString(16).slice(2),
      orderDetails: {
        items: props.items,
        totalAmount: props.totalAmount
      },
      userDetails: {
        name: enteredName,
        street: enteredStreet,
        postal: enteredPostal,
        city: enteredCity,
      }
    }
    props.sendData(
      props.getOrderReferenceId,
      'https://training-react-post-request-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        body: JSON.stringify(orderFullInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    props.confirmResultForm();
    nameReset();
    streetReset();
    postalReset();
    cityReset();
  };

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' onBlur={touchNameChangeHandler} onChange={enteredNameChangeHandler} value={enteredName} />
      </div>
      <div className={streetClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' onBlur={touchStreetChangeHandler} onChange={enteredStreetChangeHandler} value={enteredStreet}/>
      </div>
      <div className={postalClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' onBlur={touchPostalChangeHandler} onChange={enteredPostalChangeHandler} value={enteredPostal}/>
      </div>
      <div className={cityClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' onBlur={touchCityChangeHandler} onChange={enteredCityChangeHandler} value={enteredCity}/>
      </div>
      <div className={styles.actions}>
        <button type='button' onClick={props.hideCart}>
          Cancel
        </button>
        <button disabled={!formValidity} className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
