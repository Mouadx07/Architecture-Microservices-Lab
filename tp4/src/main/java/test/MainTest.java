package test;

import entities.Machine;
import entities.Salle;
import services.MachineService;
import services.SalleService;
import util.HibernateUtil;

import java.util.List;

/**
 * Programme principal de test validant la génération des tables
 * et les opérations de persistance Hibernate avec MySQL.
 */
public class MainTest {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("   DEMARRAGE DU TEST DE PERSISTANCE HIBERNATE   ");
        System.out.println("==================================================");

        SalleService salleService = new SalleService();
        MachineService machineService = new MachineService();

        // 1. Création et persistance des salles
        System.out.println("\n[1] Création et insertion des salles...");
        Salle salleA = new Salle("S1", "Salle Informatique");
        Salle salleB = new Salle("S2", "Salle Réseau & Télécoms");

        salleService.create(salleA);
        salleService.create(salleB);
        System.out.println("-> Salles créées avec succès (IDs générés : " + salleA.getId() + ", " + salleB.getId() + ")");

        // 2. Création et affectation de machines
        System.out.println("\n[2] Création et affectation des machines...");
        Machine machine1 = new Machine("M-101", "Dell", salleA);
        Machine machine2 = new Machine("M-102", "HP", salleA);
        Machine machine3 = new Machine("M-201", "Dell", salleB);
        Machine machine4 = new Machine("M-202", "Lenovo", salleB);

        machineService.create(machine1);
        machineService.create(machine2);
        machineService.create(machine3);
        machineService.create(machine4);
        System.out.println("-> 4 machines insérées et reliées aux salles.");

        // 3. Affichage de toutes les salles
        System.out.println("\n[3] Liste des salles enregistrées :");
        List<Salle> listeSalles = salleService.getAll();
        for (Salle s : listeSalles) {
            System.out.println("   - ID: " + s.getId() + " | Code: " + s.getCode() + " | Libellé: " + s.getLibelle());
        }

        // 4. Affichage de toutes les machines
        System.out.println("\n[4] Liste de toutes les machines :");
        List<Machine> listeMachines = machineService.getAll();
        for (Machine m : listeMachines) {
            System.out.println("   - ID: " + m.getId() + " | Ref: " + m.getRef() + " | Marque: " + m.getMarque()
                    + " | Salle: " + (m.getSalle() != null ? m.getSalle().getCode() : "N/A"));
        }

        // 5. Test de la requête HQL personnalisée (Étape 10 : findByMarque)
        System.out.println("\n[5] Test requête avancée HQL - Machines de marque 'Dell' :");
        List<Machine> dells = machineService.findByMarque("Dell");
        for (Machine m : dells) {
            System.out.println("   * [HQL Result] " + m.getRef() + " (" + m.getMarque() + ") hébergée en "
                    + (m.getSalle() != null ? m.getSalle().getLibelle() : "Aucune"));
        }

        // 6. Test de mise à jour (Update)
        System.out.println("\n[6] Test de modification d'une machine...");
        machine1.setMarque("Dell XPS Enterprise");
        boolean updateResult = machineService.update(machine1);
        System.out.println("-> Mise à jour de " + machine1.getRef() + " : " + (updateResult ? "SUCCES" : "ECHEC"));

        // Clôture propre des ressources Hibernate
        System.out.println("\nFermeture de la SessionFactory Hibernate...");
        HibernateUtil.shutdown();

        System.out.println("==================================================");
        System.out.println("        EXECUTION DU TEST TERMINEE AVEC SUCCES    ");
        System.out.println("==================================================");
    }
}
