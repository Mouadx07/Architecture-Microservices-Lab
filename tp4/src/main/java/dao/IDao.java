package dao;

import java.util.List;

/**
 * Contrat générique définissant les opérations CRUD fondamentales
 * pour la couche d'accès aux données.
 *
 * @param <T> Type de l'entité manipulée
 */
public interface IDao<T> {

    /**
     * Enregistre une nouvelle entité dans la source de données.
     *
     * @param o L'entité à insérer
     * @return true si l'opération a réussi, false sinon
     */
    boolean create(T o);

    /**
     * Supprime une entité existante de la source de données.
     *
     * @param o L'entité à supprimer
     * @return true si la suppression a réussi, false sinon
     */
    boolean delete(T o);

    /**
     * Met à jour les informations d'une entité existante.
     *
     * @param o L'entité avec les nouvelles valeurs
     * @return true si la mise à jour a réussi, false sinon
     */
    boolean update(T o);

    /**
     * Récupère une entité par son identifiant unique.
     *
     * @param id Identifiant de l'entité
     * @return L'entité correspondante ou null si introuvable
     */
    T getById(int id);

    /**
     * Récupère la liste intégrale des entités de ce type.
     *
     * @return Liste contenant l'ensemble des entités persistées
     */
    List<T> getAll();
}
