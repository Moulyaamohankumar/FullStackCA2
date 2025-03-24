import React, { useState, useEffect } from 'react';

export const CartComp = ({ id, email, images, quantity, price }) => {
    const [quantityVal, setQuantityVal] = useState(quantity);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!images || images.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [images]);

    const handleIncrement = () => {
        const newQuantityVal = quantityVal + 1;
        setQuantityVal(newQuantityVal);
        updateQuantityVal(newQuantityVal);
    };

    const handleDecrement = () => {
        const newQuantityVal = quantityVal > 1 ? quantityVal - 1 : 1;
        setQuantityVal(newQuantityVal);
        updateQuantityVal(newQuantityVal);
    };

    const updateQuantityVal = async (quantity) => {
        try {
            const response = await fetch('http://localhost:8000/api/v2/product/cartproduct/quantity', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, productId: id, quantity }),
            });
            if (!response.ok) {
                console.log('Error in PUT request');
            }
            const data = await response.json();
            console.log('Quantity updated:', data);
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    return (
        <div>
            <img src={images[currentIndex]} alt="Product" />
            <p>{email}</p>
            <p>Price: ${price}</p>
            <div>
                <button onClick={handleDecrement}>-</button>
                <span>{quantityVal}</span>
                <button onClick={handleIncrement}>+</button>
            </div>
        </div>
    );
};