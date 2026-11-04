import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteForm() {
  // Initialisation de l'état pour stocker les données du formulaire
  const [compte, setCompte] = useState({ solde: '', dateCreation: '', type: '' });

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    setCompte({ ...compte, [e.target.name]: e.target.value });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    axios.post(`${API_BASE_URL}/comptes`, compte) // Envoie une requête POST avec les données
      .then(() => alert('Compte ajouté')) // Confirmation de l'ajout
      .catch(error => console.error(error)); // Gestion des erreurs
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white">
        <h5 className="mb-0">Ajouter un Compte</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Solde</label>
            <input type="number" name="solde" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Date de Création</label>
            <input type="date" name="dateCreation" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="form-label">Type</label>
            <select name="type" className="form-select" value={compte.type} onChange={handleChange} required>
              <option value="" disabled>Choisir un type</option>
              <option value="COURANT">Courant</option>
              <option value="EPARGNE">Épargne</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Ajouter</button>
        </form>
      </div>
    </div>
  );
}

export default CompteForm;
