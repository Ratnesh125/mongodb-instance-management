import React from 'react';
import InstancesTable from './InstancesTable';
import AdminControls from './AdminControls';
import URILinkInput from './URILinkInput';

function App() {

  return (
    <div>
      <h4 className="text-3xl mt-4 text-center font-semibold mb-4">MongoDB Instances Management System</h4>
      <URILinkInput />
      <InstancesTable />
      <AdminControls />
    </div>
  )
}

export default App