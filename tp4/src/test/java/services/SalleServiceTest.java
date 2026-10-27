package services;

import entities.Salle;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

/**
 * Tests unitaires automatisés avec JUnit 5 pour valider la persistance
 * et le comportement du service SalleService.
 */
public class SalleServiceTest {

    private SalleService salleService;

    @BeforeEach
    public void setUp() {
        salleService = new SalleService();
    }

    @Test
    @DisplayName("Validation de la création d'une salle dans la base de données")
    public void testCreateSalle() {
        Salle salle = new Salle();
        salle.setCode("TEST-S2-" + System.currentTimeMillis());
        salle.setLibelle("Salle Réseau");

        boolean result = salleService.create(salle);
        Assertions.assertTrue(result, "La création de la salle doit réussir");
        Assertions.assertTrue(salle.getId() > 0, "L'identifiant généré doit être supérieur à zéro");
    }

    @Test
    @DisplayName("Validation de la récupération d'une salle par son identifiant")
    public void testGetById() {
        Salle salle = new Salle("TEST-S3-" + System.currentTimeMillis(), "Laboratoire Systèmes");
        boolean created = salleService.create(salle);
        Assertions.assertTrue(created, "Pré-requis : la salle doit être insérée");

        Salle chargee = salleService.getById(salle.getId());
        Assertions.assertNotNull(chargee, "La salle récupérée ne doit pas être nulle");
        Assertions.assertEquals(salle.getCode(), chargee.getCode());
        Assertions.assertEquals("Laboratoire Systèmes", chargee.getLibelle());
    }

    @Test
    @DisplayName("Validation de la mise à jour des informations d'une salle")
    public void testUpdateSalle() {
        Salle salle = new Salle("TEST-S4-" + System.currentTimeMillis(), "Salle Multimédia");
        salleService.create(salle);

        salle.setLibelle("Salle Multimédia HD & Visio");
        boolean misAJour = salleService.update(salle);
        Assertions.assertTrue(misAJour, "La mise à jour doit réussir");

        Salle verif = salleService.getById(salle.getId());
        Assertions.assertEquals("Salle Multimédia HD & Visio", verif.getLibelle());
    }

    @Test
    @DisplayName("Validation de la récupération de la liste globale des salles")
    public void testGetAll() {
        Salle salle = new Salle("TEST-S5-" + System.currentTimeMillis(), "Salle Conférence");
        salleService.create(salle);

        List<Salle> liste = salleService.getAll();
        Assertions.assertNotNull(liste, "La liste ne doit pas être nulle");
        Assertions.assertFalse(liste.isEmpty(), "La liste doit contenir au moins une salle");
    }

    @Test
    @DisplayName("Validation de la suppression d'une salle")
    public void testDeleteSalle() {
        Salle salle = new Salle("TEST-S6-" + System.currentTimeMillis(), "Salle Temporaire");
        salleService.create(salle);
        int idCree = salle.getId();

        boolean suppression = salleService.delete(salle);
        Assertions.assertTrue(suppression, "La suppression doit réussir");

        Salle resultatApresSuppression = salleService.getById(idCree);
        Assertions.assertNull(resultatApresSuppression, "La salle ne doit plus exister après suppression");
    }
}
