import React from "react";

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    cartState: false,
    isCartChange: false,
    setIsCartChange: () => { },
    showCart: () => { },
    hideCart: () => { },
    addItem: (item) => { },
    removeItem: (id) => { }
})

export default CartContext;