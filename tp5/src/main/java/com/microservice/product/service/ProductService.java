package com.microservice.product.service;

import com.microservice.product.entity.Product;
import java.util.List;

/**
 * Contrat de service exposant la logique metier relative aux produits.
 */
public interface ProductService {

    /**
     * Valide et enregistre un nouveau produit dans le catalogue.
     *
     * @param product article a ajouter
     * @throws IllegalArgumentException si les regles de gestion ne sont pas respectees
     */
    void addProduct(Product product);

    /**
     * Restitue l'ensemble des articles du catalogue.
     *
     * @return liste ordonnee des produits
     */
    List<Product> getAllProducts();

    /**
     * Recherche un article precis d'apres son identifiant.
     *
     * @param id identifiant unique
     * @return le produit recherche, ou null si absent
     */
    Product getProductById(Long id);

    /**
     * Met a jour les caracteristiques d'un produit existant.
     *
     * @param product produit contenant les donnees rafraichies
     */
    void updateProduct(Product product);

    /**
     * Retire un produit du catalogue en fonction de sa cle.
     *
     * @param id identifiant du produit a supprimer
     */
    void removeProduct(Long id);
}
