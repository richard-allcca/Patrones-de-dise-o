/**
 * ! Patrón Chain of Responsibility
 * Es un patrón de diseño de comportamiento que te permite pasar solicitudes
 * a lo largo de una cadena de manejadores.
 *
 * * Es útil cuando se necesita procesar datos de diferentes maneras, pero no
 * * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
 * * pero se sabe que se necesita procesar en una secuencia.
 *
 * https://refactoring.guru/es/design-patterns/chain-of-responsibility
 */

import { COLORS } from '../helpers/colors.ts';

/**
 * ! Ejemplo: Soporte técnico
 * En este ejemplo, tenemos una cadena de soporte técnico que maneja diferentes
 * tipos de problemas. Cada manejador en la cadena es responsable de un tipo
 * específico de problema y puede pasar el problema al siguiente manejador si
 * no puede resolverlo.
 */

interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): void;
}

// =========================================
// Manejador base abstracto
// =========================================

// Manejador base
/**
 * Clase base que implementa la interfaz Handler.
 * Proporciona la lógica para establecer el siguiente manejador en la cadena
 * y delegar la solicitud si no puede manejarla.
 */
abstract class BaseHandler implements Handler {
  private nextHandler?: Handler;

  // Método para establecer el siguiente manejador en la cadena
  // Devuelve el siguiente manejador para permitir la encadenación
  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: string): void {
    if (this.nextHandler) {
      this.nextHandler.handle(request);
    }
  }
}

// ==========================================
// Manejadores concretos
// ==========================================

// Manejadores concretos
/**
 * Manejador concreto para problemas básicos.
 * Si no puede manejar la solicitud, la pasa al siguiente manejador.
 */
class BasicSupport extends BaseHandler {
  override handle(request: string): void {
    if (request === 'básico') {
      console.log(
        'Soporte básico: %cResolviendo problema básico',
        COLORS.green
      );
      return;
    }

    console.log('Soporte básico: Pasando el problema a soporte avanzado');
    super.handle(request);
  }
}

// Manejador avanzado
/**
 * Manejador concreto para problemas avanzados.
 * Si no puede manejar la solicitud, la pasa al siguiente manejador.
 */
class AdvancedSupport extends BaseHandler {
  override handle(request: string): void {
    if (request === 'avanzado') {
      console.log(
        'Soporte avanzado: %cResolviendo problema avanzado',
        COLORS.yellow
      );
      return;
    }

    console.log(
      'Soporte avanzado: %cPasando el problema a soporte experto',
      COLORS.purple
    );
    super.handle(request);
  }
}


// Manejador experto
/**
 * Manejador concreto para problemas expertos.
 * Si no puede manejar la solicitud, no hay más manejadores en la cadena.
 */
class ExpertSupport extends BaseHandler {
  override handle(request: string): void {
    if (request === 'experto') {
      console.log(
        'Soporte experto: %cResolviendo problema experto',
        COLORS.yellow
      );
      return;
    }

    console.log(
      '%cSoporte experto: No hay nada que hacer... bye bye',
      COLORS.red
    );
  }
}

/**
 * Función principal que configura la cadena de responsabilidad.
 * Crea los manejadores y los conecta en una secuencia lógica.
 */
function main() {
  const basicSupport = new BasicSupport();
  const advancedSupport = new AdvancedSupport();
  const expertSupport = new ExpertSupport();

  // Establecer la cadena de responsabilidad
  // Soporte básico -> Soporte avanzado -> Soporte experto
  basicSupport.setNext(advancedSupport).setNext(expertSupport);

  basicSupport.handle('básico');
  basicSupport.handle('avanzado');
  basicSupport.handle('experto');
  basicSupport.handle('nuclear');
}

main();
