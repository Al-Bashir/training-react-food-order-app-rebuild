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
            if(duplicatedItem){
                totalAmount = totalAmount + (action.item.amount * action.item.price);
                duplicatedItem.amount += action.item.amount;
                updatedItems[duplicatedIndex] = duplicatedItem;
            }else{
                totalAmount = totalAmount + (action.item.amount * action.item.price);
                updatedItems.push(action.item)
            }
            return{
                items: updatedItems,
                totalAmount: totalAmount,
            }
        case 'REMOVE_ITEM':
            totalAmount -= duplicatedItem.price;
            let filteredRemovedItems = [];
            if(updatedItems[duplicatedIndex].amount > 1){
                duplicatedItem.amount -= 1;
                updatedItems[duplicatedIndex] = duplicatedItem;
                return{
                    items: updatedItems,
                    totalAmount: totalAmount,
                }
            }else{
                filteredRemovedItems = [...updatedItems.filter(element => element.id !== action.item.id)]
                return{
                    items: filteredRemovedItems,
                    totalAmount: totalAmount,
                }
            }
        default:
            break;
    }
}

const CartProvider = (props) => {
    const [cart, dispatchCart] = useReducer(cartReducer, defaultCartState);
    const [cartState, setCartState] = useState(false);
    const [isCartChange, setIsCartChange] = useState(false);

    const addItem = (item) => {
        dispatchCart({type: 'ADD_ITEM', item: item})
        setIsCartChange(true);
    }
    const removeItem = (id) => {
        const item = {
            id: id
        }
        dispatchCart({type: 'REMOVE_ITEM', item: item})
        setIsCartChange(true);
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
        isCartChange: isCartChange,
        setIsCartChange: setIsCartChange,
        showCart: showCart,
        hideCart: hideCart,
        addItem: addItem,
        removeItem: removeItem,
    }

    return <CartContext.Provider value={providedData}> {props.children} </CartContext.Provider>
}
export default CartProvider;
