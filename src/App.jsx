import React from 'react';
import InstancesTable from './InstancesTable';
import AdminControls from './AdminControls';
import URILinkInput from './URILinkInput';

function App() {

  return (
    <div>
      <h4 className="text-3xl mt-4 text-center font-semibold mb-4">MongoDB Instances Management System</h4>
      <p className="px-4 border-red-500 border-2 text-xl text-center font-bold" style={{ color: 'red' }}>
        You can't delete these databases 'admin_panel', 'courses', 'hackathondb', 'leetforces', 'portfolio', 'admin', 'local', 'test' because they contain personal data. Create your own database to delete or update it.
      </p>
      <p className="px-4 text-xl text-center font-bold" style={{ color: 'black' }}>
        Thank you :D
      </p>
      <URILinkInput />
      <InstancesTable />
      <AdminControls />
    </div>
  )
}

export default App
