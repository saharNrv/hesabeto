"use client"
import { useState } from 'react';

export default function useStorage<T>(key: string, initialValue: T) {
    // State to store our value.
    // Pass initial state function to useState (logic must only executed once).
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            // Get from local storage by key.
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue.
            return item ? JSON.parse(item) as T : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    // Return a wrapped version of useState's setter function that persists the new value to localStorage.
    const setValue = (value: T | ((val: T) => T)) => {
        try {
            // Allow value to be a function.
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // Save state.
            setStoredValue(valueToStore);
            // Save to local storage.
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {

        }
    };
    return [storedValue, setValue] as const;
}