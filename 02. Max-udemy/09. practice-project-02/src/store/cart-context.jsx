import React from "react";

const CartContext = React.createContext({
    items: [],
    tottalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {}
});

export default CartContext;