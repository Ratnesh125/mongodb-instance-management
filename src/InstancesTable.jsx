import React, { useState } from 'react';
import { useGlobalState } from './InstanceContext';

const InstancesTable = () => {

    const [instances] = useGlobalState();
    const [expandedDatabases, setExpandedDatabases] = useState({});

     const handleToggleDatabase = (databaseName) => {
        // toggle the expanded state of the database
        setExpandedDatabases((prevState) => ({
            ...prevState,
            [databaseName]: !prevState[databaseName],
        }));
    };

    // render the table of instances and collections
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4">List of Databases</h2>
            {instances.length === 0 ? (
                <p className="text-center text-gray-600">
                    No databases found. Please enter a correct URI or add a database.
                </p>
            ) : (
                <table className="w-full border-collapse table-auto bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 text-left">Instance</th>
                            <th className="p-2 text-left">Size on Disk</th>
                            <th className="p-2 text-left">Is Empty</th>
                            <th className="p-2 text-left">Total Collections</th>
                            <th className="p-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {instances.map((database) => (
                            <React.Fragment key={database.name}>
                                <tr className="border-b border-gray-300">
                                    <td className="p-2">{database.name}</td>
                                    <td className="p-2">{database.sizeOnDisk}</td>
                                    <td className="p-2">{database.empty ? 'Yes' : 'No'}</td>
                                    <td className="p-2">{database.collections.length}</td>
                                    <td className="p-2">
                                        <button
                                            onClick={() => handleToggleDatabase(database.name)}
                                            className="bg-blue-500 text-white py-1 px-2 rounded"
                                        >
                                            {expandedDatabases[database.name] ? 'Hide Collections' : 'Show Collections'}
                                        </button>
                                    </td>
                                </tr>
                                {/* display collections if the database is expanded */}
                                {expandedDatabases[database.name] && (
                                    <tr>
                                        <td colSpan="5" className="p-2 bg-gray-50">
                                            <ul className="list-disc list-inside">
                                                {database.collections.map((collection) => (
                                                    <li key={collection.name}>
                                                        {collection} 
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>

                </table>
            )}
        </div>
    );
};

export default InstancesTable;
