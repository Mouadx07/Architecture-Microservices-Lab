# Examen Pratique — Spring IoC et Hibernate (sans Spring Data JPA)

Ce projet implémente les deux exercices demandés pour l'examen pratique, en respectant rigoureusement toutes les contraintes architecturales et techniques (aucun usage de Spring Data JPA, injection par constructeur, configuration Hibernate directe avec `SessionFactory`, etc.).

---

## Structure du Projet

```text
src/main/java/org/example/
├── config/
│   └── HibernateConfig.java           # Configuration Hibernate (SessionFactory & PlatformTransactionManager)
├── dao/
│   ├── ProductDAO.java                # Interface DAO
│   └── ProductDAOImpl.java            # Implémentation DAO directe avec SessionFactory Hibernate
├── model/
│   └── Product.java                   # Entité JPA/Hibernate (@Entity, @Id, @GeneratedValue)
├── notification/
│   ├── NotificationService.java       # Interface de notification (envoyer)
│   ├── EmailNotificationService.java  # Implémentation Email (@Service)
│   ├── SmsNotificationService.java    # Implémentation SMS (@Service)
│   └── NotificationManager.java       # Composant (@Component) avec injection @Qualifier par constructeur
├── service/
│   └── ProductService.java            # Service métier (@Service, @Transactional)
└── Tp4Application.java                # Application principale & CommandLineRunner de test
```

---

## Exercice 1 — Spring IoC (8 points)

- **Interface `NotificationService`** : Contient la méthode `void envoyer(String message)`.
- **Implémentations** :
  - `EmailNotificationService` : annotée `@Service("emailNotificationService")`.
  - `SmsNotificationService` : annotée `@Service("smsNotificationService")`.
- **`NotificationManager`** :
  - Annotée `@Component`.
  - Réalise l'injection de dépendances par constructeur.
  - Utilise `@Qualifier("emailNotificationService")` pour injecter spécifiquement le service Email.
- **Test** : Exécuté au démarrage via `CommandLineRunner`.

---

## Exercice 2 — Spring IoC + Hibernate (12 points)

### Partie A — Configuration Hibernate
- Configuration de la DataSource dans `application.properties` (H2 en mémoire par défaut pour exécution autonome, configuration MySQL prête et documentée).
- Configuration Java `HibernateConfig` instanciant `SessionFactory` (`LocalSessionFactoryBean`) et `PlatformTransactionManager` (`HibernateTransactionManager`).
- Création automatique de la table `product` via `hibernate.hbm2ddl.auto=update`.

### Partie B — Couche DAO
- Interface `ProductDAO` :
  ```java
  void save(Product product);
  Product findById(Long id);
  List<Product> findAll();
  void delete(Long id);
  ```
- Implémentation `ProductDAOImpl` annotée `@Repository` utilisant directement l'API Hibernate :
  - `SessionFactory` injectée par constructeur
  - `Session` via `sessionFactory.getCurrentSession()`
  - Méthodes natives Hibernate : `persist()`, `get()`, `createQuery()`, `remove()`
  - **Aucune dépendance à `JpaRepository` ou `CrudRepository`**.

### Partie C — Service Métier
- Classe `ProductService` annotée `@Service` et `@Transactional`.
- Injection du `ProductDAO` par constructeur.

### Partie D — Exécution & Résultat
Exécuté via `CommandLineRunner` dans `Tp4Application`. Sortie console conforme au sujet :

```text
--- Gestion des produits ---

Produit ajouté : Ordinateur
Produit ajouté : Souris
Produit ajouté : Clavier

Liste des produits :
1 - Ordinateur - 7500 DH
2 - Souris - 150 DH
3 - Clavier - 250 DH

Recherche : Souris

Suppression du produit 2

Liste finale :
1 - Ordinateur
3 - Clavier
```

---

## Exécution du projet

Pour compiler et exécuter le projet avec Maven :

```bash
mvn clean compile
mvn spring-boot:run
```
