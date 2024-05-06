import React, { useState } from 'react';
import axios from 'axios';
import { useGlobalState, fetchData } from './InstanceContext';

const AdminControls = () => {
    const [globalState, setGlobalState] = useGlobalState();
    const [createDatabaseName, setCreateDatabaseName] = useState('');
    const [createCollectionName, setCreateCollectionName] = useState('');
    const [addEntryDatabaseName, setAddEntryDatabaseName] = useState('');
    const [addEntryCollectionName, setAddEntryCollectionName] = useState('');
    const [addEntryData, setAddEntryData] = useState('');
    const [deleteDatabaseName, setDeleteDatabaseName] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');
    const [entryMessage, setEntryMessage] = useState('');
    const [message, setMessage] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const storedUri = localStorage.getItem('storedURI');


    const handleCreateDatabase = async (e) => {
        e.preventDefault();
        setIsCreating(true);
        try {
            const response = await axios.post('http://localhost:3000/create-database', {
                uri: storedUri,
                databaseName: createDatabaseName,
                collectionName: createCollectionName
            });

            // Update the global state if successful
            if (response.status === 201) {
                await fetchData(setGlobalState);
            }

            setMessage(response.data.message);
            // Clear input fields
            setCreateDatabaseName('');
            setCreateCollectionName('');
        } catch (error) {
            console.error('Error creating database and collection:', error);
            setMessage('Error creating database and collection');
        } finally {
            setIsCreating(false);
            setTimeout(() => setMessage(''), 5000);
        }
    };

    const handleAddEntry = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/add-entry', {
                uri: storedUri,
                databaseName: addEntryDatabaseName,
                collectionName: addEntryCollectionName,
                entry: JSON.parse(addEntryData)
            });

            setEntryMessage(response.data.message);

            setAddEntryDatabaseName('');
            setAddEntryCollectionName('');
            setAddEntryData('');
        } catch (error) {
            console.error('Error adding entry:', error);
            setEntryMessage('Error adding entry');
        } finally {

            setTimeout(() => setEntryMessage(''), 5000);
        }
    };


    const handleDeleteDatabase = async (e) => {
        e.preventDefault();
        setIsDeleting(true);
        try {
            const response = await axios.delete('http://localhost:3000/delete-database', {
                data: { databaseName: deleteDatabaseName, uri: storedUri }
            });


            if (response.data.success || response.status === 200) {
                await fetchData(setGlobalState);
            }

            setDeleteMessage(response.data.message);

            setDeleteDatabaseName('');
        } catch (error) {
            console.error('Error deleting database:', error);
            setDeleteMessage('Error deleting database');
        } finally {
            setIsDeleting(false);

            setTimeout(() => setDeleteMessage(''), 5000);
        }
    };

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold mb-6">Admin Controls</h3>

            {/* create database and collection  */}
            <form onSubmit={handleCreateDatabase} className="mb-6">
                <h4 className="text-xl font-semibold mb-4">Create Database and Collection</h4>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Database Name"
                        value={createDatabaseName}
                        onChange={(e) => setCreateDatabaseName(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Collection Name"
                        value={createCollectionName}
                        onChange={(e) => setCreateCollectionName(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button type="submit" disabled={isCreating} className={`bg-blue-600 text-white px-4 py-2 rounded ${isCreating ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {isCreating ? 'Creating...' : 'Create'}
                </button>

                {/* message */}
                {message && (
                    <p className={`mt-4 text-center p-3 rounded border ${message.toLowerCase().includes('success') ? 'text-white bg-green-600 border-green-600' : 'text-white bg-red-600 border-red-600'}`}>
                        {message}
                    </p>
                )}
            </form>

            {/* add entry dorm */}
            <form onSubmit={handleAddEntry} className="mb-6">
                <h4 className="text-xl font-semibold mb-4">Add Entry</h4>

                {/* database dropdown */}
                <div className="mb-4">
                    <select
                        value={addEntryDatabaseName}
                        onChange={(e) => setAddEntryDatabaseName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="">Select a database</option>
                        {globalState.map((instance) => (
                            <option key={instance.name} value={instance.name}>
                                {instance.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* collection dropdown */}
                <div className="mb-4">
                    <select
                        value={addEntryCollectionName}
                        onChange={(e) => setAddEntryCollectionName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="">Select a collection</option>
                        {globalState.find((instance) => instance.name === addEntryDatabaseName)
                            ?.collections.map((collectionName) => (
                                <option key={collectionName} value={collectionName}>
                                    {collectionName}
                                </option>
                            ))}
                    </select>
                </div>

                {/* entry data input */}
                <div className="mb-4">
                    <textarea
                        placeholder="Entry Data (JSON format)"
                        value={addEntryData}
                        onChange={(e) => setAddEntryData(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                        rows={4}
                    />
                </div>

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Add Entry
                </button>

                {/*   message */}
                {entryMessage && (
                    <p className={`mt-4 text-center p-3 rounded border ${entryMessage.toLowerCase().includes('success') ? 'text-white bg-green-600 border-green-600' : 'text-white bg-red-600 border-red-600'}`}>
                        {entryMessage}
                    </p>
                )}
            </form>

            {/* delete database form */}
            <form onSubmit={handleDeleteDatabase} className="mb-6">
                <h4 className="text-xl font-semibold mb-4">Delete Database</h4>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Database Name"
                        value={deleteDatabaseName}
                        onChange={(e) => setDeleteDatabaseName(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button type="submit" disabled={isDeleting} className={`bg-red-600 text-white px-4 py-2 rounded ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </button>

                {/*  message  */}
                {deleteMessage && (
                    <p className={`mt-4 text-center p-3 rounded border ${deleteMessage.toLowerCase().includes('success') ? 'text-white bg-green-600 border-green-600' : 'text-white bg-red-600 border-red-600'}`}>
                        {deleteMessage}
                    </p>
                )}
            </form>
        </div>
    );
};

export default AdminControls;