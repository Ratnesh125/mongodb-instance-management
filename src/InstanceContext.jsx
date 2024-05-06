import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const GlobalContext = createContext([]);

export const useGlobalState = () => useContext(GlobalContext);

export const fetchData = async (setGlobalState) => {
    try {
        const storedUri = localStorage.getItem('storedURI');
        if (!storedUri) {
            console.error('No URI found in local storage');
            return;
        }
        console.log(storedUri);

        const response = await axios.post('http://localhost:3000/instance', {
            uri: storedUri,  
        });
        console.log(response);


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