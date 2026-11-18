package com.example.car.services;

import com.example.car.entities.Car;
import com.example.car.models.CarResponse;
import com.example.car.models.Client;
import com.example.car.repositories.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class CarService {

    // on passe par la gateway pour joindre le service client
    private static final String URL = "http://localhost:8888/SERVICE-CLIENT/api/client/";

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private RestTemplate restTemplate;

    public List<CarResponse> findAll() {
        return carRepository.findAll().stream()
                .map(this::mapToCarResponse)
                .toList();
    }

    public CarResponse findById(Long id) throws Exception {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new Exception("Voiture introuvable, id = " + id));
        return mapToCarResponse(car);
    }

    private CarResponse mapToCarResponse(Car car) {
        Client client = null;
        try {
            client = restTemplate.getForObject(URL + car.getClient_id(), Client.class);
        } catch (Exception e) {
            // si le service client ne repond pas, on renvoie la voiture sans client
            System.out.println("Service client indisponible : " + e.getMessage());
        }
        return CarResponse.builder()
                .id(car.getId())
                .brand(car.getBrand())
                .model(car.getModel())
                .matricule(car.getMatricule())
                .client(client)
                .build();
    }
}
