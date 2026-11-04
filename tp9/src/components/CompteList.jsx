import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteList() {
  // Déclaration d'un état pour stocker les comptes
  const [comptes, setComptes] = useState([]);

  // Utilisation de useEffect pour effectuer un appel à l'API dès le chargement
  useEffect(() => {
    axios.get(`${API_BASE_URL}/comptes`)
      .then(response => setComptes(response.data)) // Mise à jour de l'état avec les données récupérées
      .catch(error => console.error(error)); // Gestion des erreurs
  }, []); // Le tableau vide indique que l'effet s'exécute uniquement au montage du composant

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white">
        <h5 className="mb-0">Liste des Comptes</h5>
      </div>
      <div className="card-body p-0 table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Solde</th>
              <th>Date de Création</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {comptes.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-muted py-4">
                  Aucun compte disponible
                </td>
              </tr>
            ) : (
              comptes.map(compte => (
                <tr key={compte.id}>
                  <td>{compte.id}</td>
                  <td>{Number(compte.solde).toFixed(2)} DH</td>
                  <td>{compte.dateCreation?.slice(0, 10)}</td>
                  <td>
                    <span className={`badge ${compte.type === 'EPARGNE' ? 'bg-success' : 'bg-secondary'}`}>
                      {compte.type}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CompteList;
