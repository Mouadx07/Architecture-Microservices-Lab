package org.example;

import org.example.model.Product;
import org.example.notification.NotificationManager;
import org.example.service.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class Tp4Application {

    public static void main(String[] args) {
        SpringApplication.run(Tp4Application.class, args);
    }

    @Bean
    public CommandLineRunner runner(NotificationManager notificationManager, ProductService productService) {
        return args -> {
            // ==========================================================
            // EXERCICE 1 - Spring IoC (Gestion des notifications)
            // ==========================================================
            System.out.println("==================================================");
            System.out.println("--- Test Exercice 1 : Spring IoC (Notifications) ---");
            System.out.println("==================================================");
            notificationManager.envoyerNotification("Votre commande a été confirmée avec succès !");
            System.out.println();

            // ==========================================================
            // EXERCICE 2 - Spring IoC + Hibernate (Gestion des produits)
            // ==========================================================
            System.out.println("--- Gestion des produits ---");
            System.out.println();

            // 1. Ajouter trois produits
            Product p1 = new Product("Ordinateur", 7500.0, 10);
            Product p2 = new Product("Souris", 150.0, 50);
            Product p3 = new Product("Clavier", 250.0, 30);

            productService.save(p1);
            System.out.println("Produit ajouté : " + p1.getNom());

            productService.save(p2);
            System.out.println("Produit ajouté : " + p2.getNom());

            productService.save(p3);
            System.out.println("Produit ajouté : " + p3.getNom());
            System.out.println();

            // 2. Afficher tous les produits
            System.out.println("Liste des produits :");
            List<Product> produits = productService.findAll();
            for (Product p : produits) {
                System.out.println(p.getId() + " - " + p.getNom() + " - " + p.getPrix().intValue() + " DH");
            }
            System.out.println();

            // 3. Rechercher un produit par son identifiant (ID = 2)
            Product produitTrouve = productService.findById(2L);
            if (produitTrouve != null) {
                System.out.println("Recherche : " + produitTrouve.getNom());
            }
            System.out.println();

            // 4. Supprimer un produit (ID = 2)
            System.out.println("Suppression du produit 2");
            productService.delete(2L);
            System.out.println();

            // 5. Afficher la liste restante
            System.out.println("Liste finale :");
            List<Product> produitsRestants = productService.findAll();
            for (Product p : produitsRestants) {
                System.out.println(p.getId() + " - " + p.getNom());
            }
        };
    }
}
