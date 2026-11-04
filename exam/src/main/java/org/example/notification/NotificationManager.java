package org.example.notification;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
public class NotificationManager {

    private final NotificationService service;

    // Injection par constructeur : deux beans NotificationService existent,
    // @Qualifier("email") indique a Spring lequel choisir.
    public NotificationManager(@Qualifier("email") NotificationService service) {
        this.service = service;
    }

    public void notifier(String message) {
        service.envoyer(message);
    }
}
