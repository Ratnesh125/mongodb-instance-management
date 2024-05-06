import React from 'react';
import InstancesTable from './InstancesTable';
import AdminControls from './AdminControls';
import URILinkInput from './URILinkInput';

function App() {

  return (
    <div>
      <h4 className="text-3xl mt-4 text-center font-semibold mb-4">MongoDB Instances Management System</h4>
      <p className="ml-96 mr-96 border-red-500 border-8 text-xl" style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>
        You can't delete these databases 'admin_panel', 'courses', 'hackathondb', 'leetforces', 'portfolio', 'admin', 'local', 'test' because it contain my personal data. Create your own database to delete or update it.
      </p>
      <p className="ml-96 mr-96  text-xl" style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>
        Thank you :D 
      </p>
      <URILinkInput />
      <InstancesTable />
      <AdminControls />
    </div>
  )
}

export default App
