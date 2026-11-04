import React from 'react';
import CompteList from './components/CompteList';
import CompteForm from './components/CompteForm';

function App() {
  return (
    <>
      <nav className="navbar navbar-dark bg-primary mb-4">
        <div className="container">
          <span className="navbar-brand fw-semibold">Gestion des Comptes</span>
        </div>
      </nav>

      <main className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <CompteForm />
          </div>
          <div className="col-lg-8">
            <CompteList />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
