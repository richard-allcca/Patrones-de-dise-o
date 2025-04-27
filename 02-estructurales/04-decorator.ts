/**
 * ! Patrón decorador
 * Es un patrón de diseño estructural que permite añadir
 * funcionalidades a objetos, colocando estos objetos dentro de
 * objetos encapsuladores especiales que contienen estas funcionalidades.
 *
 * No confundirlo con los decoradores de TypeScript que son anotaciones.
 *
 * * Es útil cuando necesitas añadir funcionalidades a objetos
 *   de manera dinámica y flexible.
 *
 * https://refactoring.guru/es/design-patterns/decorator
 */

import { COLORS } from '../helpers/colors.ts';

// 1. Interfaz base que define el contrato para las notificaciones
interface Notification {
  send(message: string): void;
}

// 2. Clase concreta que implementa la interfaz base
// Esta es la funcionalidad básica de enviar una notificación.
class BasicNotification implements Notification {
  send(message: string): void {
    console.log(
      `%cEnviando notificación básica: %c${message}`,
      COLORS.blue,
      COLORS.white
    );
  }
}

// 3. Clase abstracta decoradora
// Sirve como base para los decoradores concretos y delega la funcionalidad
// a la notificación que envuelve.
abstract class NotificationDecorator implements Notification {
  protected notification: Notification;

  constructor(notification: Notification) {
    this.notification = notification; // Envuelve una notificación existente
  }

  send(message: string): void {
    this.notification.send(message); // Llama al método de la notificación envuelta
  }
}

// 4. Decorador concreto: añade funcionalidad para enviar notificaciones por correo
class EmailDecorator extends NotificationDecorator {
  private sendEmail(message: string) {
    console.log(
      `%cEnviando notificación por correo electrónico:%c${message}`,
      COLORS.green,
      COLORS.white
    );
  }

  override send(message: string): void {
    super.send(message); // Llama al método de la notificación envuelta
    this.sendEmail(message); // Añade la funcionalidad específica del correo
  }
}

// 5. Decorador concreto: añade funcionalidad para enviar notificaciones por SMS
class SMSDecorator extends NotificationDecorator {
  private sendSMS(message: string) {
    console.log(
      `%cEnviando notificación por SMS: %c${message}`,
      COLORS.red,
      COLORS.white
    );
  }

  override send(message: string): void {
    super.send(message); // Llama al método de la notificación envuelta
    this.sendSMS(message); // Añade la funcionalidad específica del SMS
  }
}

// 6. Código cliente
function main() {
  // Crear una notificación básica
  let notification: Notification = new BasicNotification();

  // Decorar la notificación básica con funcionalidad de correo
  notification = new EmailDecorator(notification);

  // Decorar la notificación con funcionalidad de SMS
  notification = new SMSDecorator(notification);

  // Enviar la notificación decorada
  // El flujo será: notificación básica -> correo -> SMS
  notification.send('Alerta de sistema!');
}

main();