package entities;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * Entité représentant une machine informatique installée dans une salle.
 */
@Entity
@Table(name = "machines")
public class Machine implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "ref", nullable = false, length = 50)
    private String ref;

    @Column(name = "marque", length = 60)
    private String marque;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "salle_id")
    private Salle salle;

    /**
     * Constructeur sans arguments requis par le standard JPA / Hibernate.
     */
    public Machine() {
    }

    /**
     * Constructeur d'initialisation rapide (sans salle affectée).
     *
     * @param ref    Référence unique de la machine
     * @param marque Fabricant ou marque du matériel
     */
    public Machine(String ref, String marque) {
        this.ref = ref;
        this.marque = marque;
    }

    /**
     * Constructeur avec assignation de salle.
     *
     * @param ref    Référence de la machine
     * @param marque Fabricant du matériel
     * @param salle  Salle hébergeant la machine
     */
    public Machine(String ref, String marque, Salle salle) {
        this.ref = ref;
        this.marque = marque;
        this.salle = salle;
    }

    /**
     * Constructeur complet.
     *
     * @param id     Identifiant technique
     * @param ref    Référence
     * @param marque Marque
     * @param salle  Salle
     */
    public Machine(int id, String ref, String marque, Salle salle) {
        this.id = id;
        this.ref = ref;
        this.marque = marque;
        this.salle = salle;
    }

    // --- Getters et Setters ---

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRef() {
        return ref;
    }

    public void setRef(String ref) {
        this.ref = ref;
    }

    public String getMarque() {
        return marque;
    }

    public void setMarque(String marque) {
        this.marque = marque;
    }

    public Salle getSalle() {
        return salle;
    }

    public void setSalle(Salle salle) {
        this.salle = salle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Machine)) return false;
        Machine machine = (Machine) o;
        if (id != 0 && machine.id != 0) {
            return id == machine.id;
        }
        return Objects.equals(ref, machine.ref);
    }

    @Override
    public int hashCode() {
        return id != 0 ? Objects.hash(id) : Objects.hash(ref);
    }

    @Override
    public String toString() {
        return "Machine{" +
                "id=" + id +
                ", ref='" + ref + '\'' +
                ", marque='" + marque + '\'' +
                ", salle=" + (salle != null ? salle.getCode() : "non affectée") +
                '}';
    }
}
