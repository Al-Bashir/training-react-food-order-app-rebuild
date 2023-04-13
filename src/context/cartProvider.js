import { useReducer, useState } from 'react';
import CartContext from './Cart-Context';


const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    let totalAmount = state.totalAmount;
    const updatedItems = [...state.items];
    let duplicatedItem = null;
    let duplicatedIndex = null;
    state.items.forEach((item, index) => {
        if(item.id === action.item.id){
            duplicatedItem = {...item};
            duplicatedIndex = index;
        }
    })
    switch (action.type) {
        case 'ADD_ITEM':
            totalAmount += action.item.price;
            if(duplicatedItem){
                duplicatedItem.amount += action.item.amount;
                updatedItems[duplicatedIndex] = duplicatedItem;
            }else{
                updatedItems.concat(action.item)
            }
            return{
                items: updatedItems,
                totalAmount: totalAmount,
            }
        case 'REMOVE_ITEM':
            totalAmount -= action.item.price;
            if(duplicatedItem){
                updatedItems[duplicatedIndex] = duplicatedItem;
            }else{
                updatedItems.filter(element => element.id !== action.item.id)
            }
            return{
                items: updatedItems,
                totalAmount: totalAmount,
            }
        default:
            break;
    }
}

const CartProvider = () => {
    const [cart, dispatchCart] = useReducer(defaultCartState, cartReducer);
    const [cartState, setCartState] = useState(false);


    const addItem = (item) => {
        dispatchCart({type: 'ADD_ITEM', item: item})
    }
    const removeItem = (id) => {
        const item = {
            id: id
        }
        dispatchCart({type: 'REMOVE_ITEM', item: item})
    }

    const showCart = () => {
        setCartState(true);
    }
    const hideCart = () => {
        setCartState(false)
    }

    const providedData = {
        items: cart.items,
        totalAmount: cart.totalAmount,
        cartState: cartState,
        showCart: showCart,
        hideCart: hideCart,
        addItem: addItem,
        removeItem: removeItem
    }

    return <CartContext.Provider value={providedData}> {props.children} </CartContext.Provider>
}
export default CartProvider;
