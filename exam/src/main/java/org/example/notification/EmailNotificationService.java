package org.example.notification;

import org.springframework.stereotype.Service;

@Service("emailNotificationService")
public class EmailNotificationService implements NotificationService {

    @Override
    public void envoyer(String message) {
        System.out.println("Notification par Email envoyée : " + message);
    }
}
