import React, { useState, useEffect } from 'react';
import { useGlobalState, fetchData } from './InstanceContext';

const URILinkInput = () => {

    const [uri, setUri] = useState('');
    const [globalState, setGlobalState] = useGlobalState();
    const storedUri = localStorage.getItem('storedURI');
    const maskedUri = maskMongoDBUri(storedUri) ||"  ";

    useEffect(() => {
        if (storedUri === null) {
            setUri(" ");
        }
    }, [storedUri]);
    
    const handleInputChange = (e) => {
        setUri(e.target.value);
    };
    function maskMongoDBUri(uri) {
        if(uri != null){
            const pattern = /\/\/(.*?):(.*?)@/;
            const maskedUri = uri.replace(pattern, '//***:***@');
            return maskedUri;
        }
    }

    // Handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();

        localStorage.setItem('storedURI', uri);
        fetchData(setGlobalState);

        setUri('');
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4">Store URI Link</h2>
            <form onSubmit={handleFormSubmit} className="mb-6">
                <input
                    type="text"
                    placeholder="Enter URI link"
                    value={uri}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <h2 className="text-xl text-red-500 font-semibold mb-4">Test uri: mongodb+srv://test1:test@cluster0.2mxjqot.mongodb.net </h2>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
                >
                    Connect to MongoDB
                </button>

                <h2 className="text-xl font-semibold mb-4">Connected with {maskedUri}</h2>

            </form>
             <p className="text-gray-600">URI link will be stored in local storage.</p>
        </div>
    );
};

export default URILinkInput;
