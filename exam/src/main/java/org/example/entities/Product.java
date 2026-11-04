package org.example.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

// Hibernate cree la table a partir de cette classe
@Entity
@Table(name = "product") // nom exact demande (MySQL sous Linux est sensible a la casse)
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AUTO_INCREMENT cote MySQL
    private Long id;

    private String nom;
    private Double prix;
    private Integer quantite;

    // Constructeur vide obligatoire pour Hibernate
    public Product() {
    }

    public Product(String nom, Double prix, Integer quantite) {
        this.nom = nom;
        this.prix = prix;
        this.quantite = quantite;
    }

    public Long getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Double getPrix() {
        return prix;
    }

    public void setPrix(Double prix) {
        this.prix = prix;
    }

    public Integer getQuantite() {
        return quantite;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }
}
