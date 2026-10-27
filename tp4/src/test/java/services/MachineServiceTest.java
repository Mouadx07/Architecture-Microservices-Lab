package services;

import entities.Machine;
import entities.Salle;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

/**
 * Tests unitaires automatisés avec JUnit 5 pour valider la persistance
 * de MachineService et les requêtes personnalisées HQL.
 */
public class MachineServiceTest {

    private SalleService salleService;
    private MachineService machineService;

    @BeforeEach
    public void setUp() {
        salleService = new SalleService();
        machineService = new MachineService();
    }

    @Test
    @DisplayName("Validation de la création d'une machine associée à une salle")
    public void testCreateMachineAvecSalle() {
        Salle salle = new Salle("TEST-LAB-" + System.currentTimeMillis(), "Lab Test");
        salleService.create(salle);

        Machine machine = new Machine("REF-" + System.currentTimeMillis(), "Lenovo", salle);
        boolean result = machineService.create(machine);

        Assertions.assertTrue(result, "La création de la machine doit réussir");
        Assertions.assertTrue(machine.getId() > 0, "L'ID de la machine doit être supérieur à zéro");
        Assertions.assertNotNull(machine.getSalle(), "La machine doit être rattachée à une salle");
    }

    @Test
    @DisplayName("Validation de la recherche par marque via HQL")
    public void testFindByMarque() {
        String marqueCible = "Apple-" + System.currentTimeMillis();
        Machine m1 = new Machine("MAC-" + System.currentTimeMillis() + "-1", marqueCible);
        Machine m2 = new Machine("MAC-" + System.currentTimeMillis() + "-2", marqueCible);

        machineService.create(m1);
        machineService.create(m2);

        List<Machine> machinesTrouvees = machineService.findByMarque(marqueCible);
        Assertions.assertEquals(2, machinesTrouvees.size(), "Doit retrouver exactement les deux machines créées");
    }
}
