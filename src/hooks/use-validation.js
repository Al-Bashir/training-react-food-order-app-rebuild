import { useState } from "react";

const useValidation = (validationMethod) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const checkValidity = validationMethod(enteredValue);
    const hasError = !checkValidity && isTouched;
    
    const enteredValueChangeHandler = (event) => {
        setEnteredValue(event.target.value);
    }
    
    const touchChangeHandler = () => {
        setIsTouched(true);
    }

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    }
    

    return {
        hasError: hasError,
        enteredValue: enteredValue,
        checkValidity: checkValidity,
        enteredValueChangeHandler: enteredValueChangeHandler,
        touchChangeHandler: touchChangeHandler,
        reset: reset
    }
}

export default useValidation;