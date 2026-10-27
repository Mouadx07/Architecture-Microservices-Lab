package org.example.notification;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
public class NotificationManager {

    private final NotificationService notificationService;

    // Injection de dépendances par constructeur avec sélection du service Email via @Qualifier
    public NotificationManager(@Qualifier("emailNotificationService") NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    public void envoyerNotification(String message) {
        this.notificationService.envoyer(message);
    }

    public NotificationService getNotificationService() {
        return notificationService;
    }
}
