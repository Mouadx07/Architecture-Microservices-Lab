package com.microservice.product.dao;

import java.util.List;

/**
 * Contrat generique pour les operations d'acces aux donnees (CRUD).
 *
 * @param <T> Type de l'entite persistante manipulee
 */
public interface IDao<T> {

    /**
     * Persiste une nouvelle instance d'entite dans le magasin de donnees.
     *
     * @param entity objet a enregistrer
     */
    void save(T entity);

    /**
     * Met a jour l'etat d'une entite deja persistee.
     *
     * @param entity entite modifiee
     */
    void update(T entity);

    /**
     * Supprime une entite de la base de donnees.
     *
     * @param entity entite a retirer
     */
    void delete(T entity);

    /**
     * Recherche une entite par son identifiant unique.
     *
     * @param id cle primaire
     * @return entite correspondante ou null si introuvable
     */
    T findById(Long id);

    /**
     * Recupere la totalite des enregistrements pour le type d'entite specifie.
     *
     * @return liste des entites existantes
     */
    List<T> findAll();
}
