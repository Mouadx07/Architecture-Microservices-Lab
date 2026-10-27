package com.microservice.product;

import com.microservice.product.config.AppConfig;
import com.microservice.product.entity.Product;
import com.microservice.product.service.ProductService;
import com.microservice.product.service.ProductServiceImpl;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.List;

/**
 * Classe principale executant le scenario complet d'usage :
 * - Initialisation du conteneur IoC Spring
 * - Injection du service metier ProductService
 * - Enregistrement d'un produit
 * - Consultation de la base et affichage du catalogue
 */
public class MainApp {

    public static void main(String[] args) {
        System.out.println("=== Demarrage de l'application Microservice Product ===");

        // Demarrage du conteneur Spring IoC
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

        try {
            // Recuperation du composant metier
            ProductService productService = context.getBean(ProductServiceImpl.class);

            // Creation d'une nouvelle reference produit
            Product sampleProduct = new Product("Microservice Gateway", 149.99);
            System.out.println("Ajout du produit en cours : " + sampleProduct.getName() + " (" + sampleProduct.getPrice() + " €)");
            productService.addProduct(sampleProduct);

            // Consultation et verification du nombre total de produits
            List<Product> catalog = productService.getAllProducts();
            System.out.println("Produit ajouté avec succès ! Total en base : " + catalog.size());

            // Affichage detaille des articles presents en base
            System.out.println("\n--- Contenu actuel du catalogue ---");
            for (Product item : catalog) {
                System.out.println(" -> " + item);
            }
            System.out.println("----------------------------------\n");

        } catch (Exception ex) {
            System.err.println("Une erreur est survenue lors de l'execution : " + ex.getMessage());
            ex.printStackTrace();
        } finally {
            // Fermeture propre des ressources et du contexte applicatif
            context.close();
            System.out.println("=== Fermeture du contexte applicatif terminee ===");
        }
    }
}
