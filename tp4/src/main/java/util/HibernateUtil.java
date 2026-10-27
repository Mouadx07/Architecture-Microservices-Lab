package util;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

/**
 * Classe utilitaire pour la gestion centralisée de la SessionFactory Hibernate.
 * Applique le patron Singleton pour garantir une unique instance partagée thread-safe.
 */
public final class HibernateUtil {

    private static final SessionFactory sessionFactory = buildSessionFactory();

    // Empêche l'instanciation de cette classe utilitaire
    private HibernateUtil() {
    }

    private static SessionFactory buildSessionFactory() {
        try {
            // Charge la configuration depuis src/main/resources/hibernate.cfg.xml
            return new Configuration().configure().buildSessionFactory();
        } catch (Throwable ex) {
            System.err.println("Échec de l'initialisation de la SessionFactory Hibernate : " + ex);
            throw new ExceptionInInitializerError(ex);
        }
    }

    /**
     * Fournit l'instance globale de SessionFactory.
     *
     * @return L'instance unique de SessionFactory
     */
    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    /**
     * Ferme proprement la SessionFactory et libère les pools de connexions JDBC
     * ainsi que les threads d'arrière-plan du pilote MySQL.
     */
    public static void shutdown() {
        if (sessionFactory != null && !sessionFactory.isClosed()) {
            sessionFactory.close();
        }
        try {
            // Arrête proprement le thread de surveillance du pilote MySQL
            com.mysql.cj.jdbc.AbandonedConnectionCleanupThread.checkedShutdown();
        } catch (Throwable ignored) {
            // Ignoré si le pilote n'utilise pas ce thread
        }
    }
}
