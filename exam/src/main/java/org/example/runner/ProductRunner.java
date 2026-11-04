package org.example.runner;

import org.example.entities.Product;
import org.example.service.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(2)
public class ProductRunner implements CommandLineRunner {

    private final ProductService productService;

    public ProductRunner(ProductService productService) {
        this.productService = productService;
    }

    @Override
    public void run(String... args) {
        System.out.println("=== Gestion des produits ===");
        System.out.println();

        // 1. Ajouter trois produits
        Product ordinateur = new Product("Ordinateur", 7500.0, 5);
        Product souris = new Product("Souris", 150.0, 40);
        Product clavier = new Product("Clavier", 250.0, 20);
        for (Product p : new Product[]{ordinateur, souris, clavier}) {
            productService.ajouter(p);
            System.out.println("Produit ajouté : " + p.getNom());
        }
        System.out.println();

        // 2. Afficher tous les produits
        System.out.println("Liste des produits :");
        for (Product p : productService.lister()) {
            System.out.println(p.getId() + " - " + p.getNom() + " - " + Math.round(p.getPrix()) + " DH");
        }
        System.out.println();

        // 3. Rechercher par id (l'id a ete rempli par Hibernate apres persist)
        Product trouve = productService.chercher(souris.getId());
        System.out.println("Recherche : " + trouve.getNom());
        System.out.println();

        // 4. Supprimer un produit
        System.out.println("Suppression du produit " + souris.getId());
        productService.supprimer(souris.getId());
        System.out.println();

        // 5. Afficher la liste restante
        System.out.println("Liste finale :");
        for (Product p : productService.lister()) {
            System.out.println(p.getId() + " - " + p.getNom());
        }
    }
}
