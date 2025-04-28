/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */

import { COLORS } from '../helpers/colors.ts';

/**
 * En este ejemplo, tenemos un sistema de notificaciones que puede enviar
 * notificaciones a través de diferentes canales (correo electrónico, SMS,
 * notificaciones push). El patrón Bridge se utiliza para separar la lógica
 * de la notificación de los canales de comunicación.
 */

interface Ability {
  use(): void;
}

/** ============================================================
 * SECTION - Clases de habilidades
 * Estas clases representan diferentes habilidades que pueden ser utilizadas por los personajes.
 */

class SwordAttack implements Ability {
  use(): void {
    console.log('Ataca con una %cespada ferozmente', COLORS.blue);
  }
}

class AxeAttack implements Ability {
  use(): void {
    console.log('Ataca con una %chacha brutalmente', COLORS.blue);
  }
}

class MagicSpell implements Ability {
  use(): void {
    console.log('Lanza un hechizo %cmágico poderoso', COLORS.green);
  }
}

class FireballSpell implements Ability {
  use(): void {
    console.log('Lanza una %cbola de fuego', COLORS.green);
  }
}

/** ============================================================
 * Clase abstracta Character
 * Define la estructura base para los personajes.
 * Incluye una referencia a una habilidad (`Ability`) que puede ser cambiada dinámicamente.
 */

abstract class Character {
  protected ability: Ability;

  constructor(ability: Ability) {
    this.ability = ability; // Asigna la habilidad inicial al personaje.
  }

  setAbility(ability: Ability): void {
    this.ability = ability;
  }

  /**
   * Método abstracto performAbility
   * Debe ser implementado por las clases derivadas para ejecutar la habilidad del personaje.
   */
  abstract executeAbility(): void;
}

/** ============================================================
 * SECTION - Clases concretas de personajes
 * Estas clases representan diferentes tipos de personajes que pueden tener habilidades.
 */

class Warrior extends Character {
  override executeAbility(): void {
    console.log('\nEl guerrero está listo para luchar');
    this.ability.use(); // Ejecuta la habilidad asignada al guerrero.
  }
}

class Mage extends Character {
  override executeAbility(): void {
    console.log('\nEl mago prepara su magia');
    this.ability.use(); // Ejecuta la habilidad asignada al mago.
  }
}

//  ============================================================
function main() {
  // Crea un guerrero con la habilidad de atacar con espada.
  const warrior = new Warrior(new SwordAttack());
  warrior.executeAbility();

  // Cambia la habilidad del guerrero a atacar con un hacha.
  warrior.setAbility(new AxeAttack());
  warrior.executeAbility();

  // Crea un mago con la habilidad de lanzar una bola de fuego.
  const mage = new Mage(new FireballSpell());
  mage.executeAbility();

  // Cambia la habilidad del mago a lanzar un hechizo mágico.
  mage.setAbility(new MagicSpell());
  mage.executeAbility();
}

main();
