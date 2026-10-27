package org.example.notification;

import org.springframework.stereotype.Service;

@Service("smsNotificationService")
public class SmsNotificationService implements NotificationService {

    @Override
    public void envoyer(String message) {
        System.out.println("Notification par SMS envoyée : " + message);
    }
}
