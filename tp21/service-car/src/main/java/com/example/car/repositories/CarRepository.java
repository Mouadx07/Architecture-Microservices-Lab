package com.example.car.repositories;

import com.example.car.entities.Car;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarRepository extends JpaRepository<Car, Long> {

    // requete generee : select ... where client_id = ?
    List<Car> findByClientId(Long clientId);
}
