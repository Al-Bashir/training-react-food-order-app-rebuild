import { useState, useCallback } from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState({isError: false, message: ''});

    const fetchData = useCallback( async (processFunc, url, headerBody) => {
        setIsLoading(true);
        setIsError({isError: false, massage: ''})
        const requestHeaderBody = headerBody ? headerBody : {};
        try{
            const response = await fetch(url, requestHeaderBody);
            if(!response.ok){
                throw new Error(`Request failed! - Error code: ${response.status}`);
            }
            const data = await response.json();
            processFunc(data)
        }catch (error) {
            console.log(error);
            setIsError({
                isError: true,
                message: error.message,
            })
        }
        setIsLoading(false);
    },[])
    return{
        isLoading: isLoading,
        isError: isError,
        fetchData: fetchData
    }
}

export default useHttp;