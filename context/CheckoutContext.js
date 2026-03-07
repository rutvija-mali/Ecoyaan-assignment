"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CheckoutContext = createContext(null);

const STORAGE_KEY = "ecoyaan_checkout_state";

export function CheckoutProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [shippingFee, setShippingFee] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [shippingAddress, setShippingAddress] = useState(null);
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    // Rehydrate from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.cartItems) setCartItems(parsed.cartItems);
                if (parsed.shippingFee !== undefined) setShippingFee(parsed.shippingFee);
                if (parsed.discount !== undefined) setDiscount(parsed.discount);
                if (parsed.shippingAddress) setShippingAddress(parsed.shippingAddress);
                if (parsed.savedAddresses) setSavedAddresses(parsed.savedAddresses);
                if (parsed.orderPlaced) setOrderPlaced(parsed.orderPlaced);
            }
        } catch (e) {
            console.error("Failed to load checkout state:", e);
        }
        setHydrated(true);
    }, []);

    // Persist to localStorage on state change
    useEffect(() => {
        if (!hydrated) return;
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({ cartItems, shippingFee, discount, shippingAddress, savedAddresses, orderPlaced })
            );
        } catch (e) {
            console.error("Failed to save checkout state:", e);
        }
    }, [cartItems, shippingFee, discount, shippingAddress, savedAddresses, orderPlaced, hydrated]);

    const initializeCart = (data) => {
        // Only initialize if cart is empty (don't overwrite localStorage state)
        if (cartItems.length === 0) {
            setCartItems(data.cartItems);
            setShippingFee(data.shipping_fee);
            setDiscount(data.discount_applied);
        }
    };

    const updateShippingAddress = (address) => {
        setShippingAddress(address);
    };

    const addAddress = (address) => {
        const newAddress = { ...address, id: Date.now().toString() };
        setSavedAddresses((prev) => [...prev, newAddress]);
        return newAddress;
    };

    const placeOrder = () => {
        setOrderPlaced(true);
    };

    const resetOrder = () => {
        setCartItems([]);
        setShippingAddress(null);
        setOrderPlaced(false);
        setShippingFee(0);
        setDiscount(0);

        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    cartItems: [],
                    shippingFee: 0,
                    discount: 0,
                    shippingAddress: null,
                    savedAddresses,
                    orderPlaced: false,
                })
            );
        } catch (e) {
            console.error("Failed to clear checkout state:", e);
        }
    };

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.product_price * item.quantity,
        0
    );
    const grandTotal = subtotal + shippingFee - discount;

    return (
        <CheckoutContext.Provider
            value={{
                cartItems,
                shippingFee,
                discount,
                shippingAddress,
                savedAddresses,
                orderPlaced,
                subtotal,
                grandTotal,
                hydrated,
                initializeCart,
                updateShippingAddress,
                addAddress,
                placeOrder,
                resetOrder,
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
}

export function useCheckout() {
    const context = useContext(CheckoutContext);
    if (!context) {
        throw new Error("useCheckout must be used within a CheckoutProvider");
    }
    return context;
}
