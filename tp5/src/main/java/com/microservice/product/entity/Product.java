package com.microservice.product.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Objects;

/**
 * Entite metier representant un article / produit au sein du microservice.
 * Mappee sur la table relationnelle 'products'.
 */
@Entity
@Table(name = "products")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "name", nullable = false, length = 150)
    private String name;

    @Column(name = "price", nullable = false)
    private double price;

    /**
     * Constructeur par defaut requis par JPA / Hibernate.
     */
    public Product() {
        super();
    }

    /**
     * Constructeur d'initialisation rapide pour les nouveaux produits (sans identifiant prealable).
     *
     * @param name  designation du produit
     * @param price montant unitaire du produit
     */
    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    /**
     * Constructeur complet.
     *
     * @param id    cle primaire
     * @param name  designation du produit
     * @param price montant unitaire
     */
    public Product(Long id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    // --- Accesseurs et Mutateurs ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Product other = (Product) obj;
        return Objects.equals(id, other.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return String.format("Product[id=%d, name='%s', price=%.2f €]", id, name, price);
    }
}
