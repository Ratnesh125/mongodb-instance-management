import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const GlobalContext = createContext([]);

export const useGlobalState = () => useContext(GlobalContext);

export const fetchData = async (setGlobalState) => {
    try {
        const response = await axios.get('http://localhost:3000/instance');
        setGlobalState(response.data.databases);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const GlobalProvider = ({ children }) => {

    const [globalState, setGlobalState] = useState([]);

    useEffect(() => {
        fetchData(setGlobalState);
    }, []);

    return (
        <GlobalContext.Provider value={[globalState, setGlobalState]}>
            {children}
        </GlobalContext.Provider>
    );
};
