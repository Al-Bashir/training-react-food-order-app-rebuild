import React from "react";

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    cartState: false,
    showCart: () => { },
    hideCart: () => { },
    addItem: (item) => { },
    removeItem: (id) => { }
})

export default CartContext;