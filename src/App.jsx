import React from 'react';
import InstancesTable from './InstancesTable';
import AdminControls from './AdminControls';
 
function App() {
 
  return (
    <div>
      <h4 className="text-3xl mt-4 text-center font-semibold mb-4">MongoDB Instances Management System</h4>
      <InstancesTable />
      <AdminControls />
     </div>
  )
}

export default App
