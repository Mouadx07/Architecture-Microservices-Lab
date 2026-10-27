package com.microservice.product;

import com.microservice.product.config.AppConfig;
import org.hibernate.SessionFactory;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

/**
 * Programme de test initial verifiant le chargement du contexte Spring
 * et l'initialisation de la SessionFactory Hibernate.
 */
public class TestHibernate {

    public static void main(String[] args) {
        System.out.println("=================================================");
        System.out.println(" Verification de la configuration Hibernate / Spring");
        System.out.println("=================================================");

        try (AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class)) {
            // Verifie que le bean SessionFactory est bien enregistre et pret
            SessionFactory sessionFactory = context.getBean(SessionFactory.class);
            System.out.println("Contexte Spring initialisé avec succès !");
            System.out.println("SessionFactory Hibernate active : " + (sessionFactory != null));
            System.out.println("Statut : Prêt à recevoir des transactions.");
        } catch (Exception ex) {
            System.err.println("Erreur d'initialisation du contexte Spring / Hibernate : " + ex.getMessage());
            ex.printStackTrace();
        }
    }
}
