package org.example.runner;

import org.example.notification.NotificationManager;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(1)
public class NotificationRunner implements CommandLineRunner {

    private final NotificationManager manager;

    public NotificationRunner(NotificationManager manager) {
        this.manager = manager;
    }

    @Override
    public void run(String... args) {
        System.out.println("=== Exercice 1 : Notifications ===");
        manager.notifier("Bienvenue, votre compte est active");
        System.out.println();
    }
}
