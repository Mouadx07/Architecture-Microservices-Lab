package entities;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Entité représentant une salle pouvant héberger plusieurs machines.
 */
@Entity
@Table(name = "salles")
public class Salle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "code", nullable = false, length = 50)
    private String code;

    @Column(name = "libelle", length = 100)
    private String libelle;

    @OneToMany(mappedBy = "salle", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Machine> machines = new ArrayList<>();

    /**
     * Constructeur par défaut requis par Hibernate.
     */
    public Salle() {
    }

    /**
     * Constructeur d'initialisation sans identifiant technique.
     *
     * @param code    Code abrégé de la salle (ex: S1)
     * @param libelle Désignation complète de la salle
     */
    public Salle(String code, String libelle) {
        this.code = code;
        this.libelle = libelle;
    }

    /**
     * Constructeur complet.
     *
     * @param id      Identifiant persistant
     * @param code    Code de la salle
     * @param libelle Désignation de la salle
     */
    public Salle(int id, String code, String libelle) {
        this.id = id;
        this.code = code;
        this.libelle = libelle;
    }

    // --- Méthodes utilitaires de synchronisation bidirectionnelle ---

    /**
     * Associe une machine à cette salle en maintenant la cohérence des deux côtés.
     *
     * @param machine La machine à ajouter
     */
    public void addMachine(Machine machine) {
        if (machine != null) {
            this.machines.add(machine);
            machine.setSalle(this);
        }
    }

    /**
     * Dissocie une machine de cette salle.
     *
     * @param machine La machine à retirer
     */
    public void removeMachine(Machine machine) {
        if (machine != null) {
            this.machines.remove(machine);
            machine.setSalle(null);
        }
    }

    // --- Getters et Setters ---

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public List<Machine> getMachines() {
        return machines;
    }

    public void setMachines(List<Machine> machines) {
        this.machines = machines;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Salle)) return false;
        Salle salle = (Salle) o;
        if (id != 0 && salle.id != 0) {
            return id == salle.id;
        }
        return Objects.equals(code, salle.code);
    }

    @Override
    public int hashCode() {
        return id != 0 ? Objects.hash(id) : Objects.hash(code);
    }

    @Override
    public String toString() {
        return "Salle{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", libelle='" + libelle + '\'' +
                ", nombreMachines=" + (machines != null ? machines.size() : 0) +
                '}';
    }
}
