package ma.ws.jaxrs.repositories;

import ma.ws.jaxrs.entities.Compte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface CompteRepository extends JpaRepository<Compte, Long> {
}