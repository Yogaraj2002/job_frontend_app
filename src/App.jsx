import React, { useState } from 'react';
import Header from '../src/components/Header';
import JobList from '../src/components/JobList';
import JobForm from '../src/components/JobForm';
import './App.css'
function App() {
  const [isCreatingJob, setIsCreatingJob] = useState(false);

  return (
    <div className="app-container">
      <Header onCreateJob={() => setIsCreatingJob(true)} />
      <main className="main-content">
        {isCreatingJob ? (
          <JobForm onClose={() => setIsCreatingJob(false)} />
        ) : (
          <JobList />
        )}
      </main>
    </div>
  );
}

export default App;