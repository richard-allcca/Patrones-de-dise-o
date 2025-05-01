/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */

import { COLORS } from '../helpers/colors.ts';

// * El objeto GameMemento es el que se va a guardar y restaurar.
// * Tiene un estado interno que se puede guardar y restaurar a través de los mementos.
class GameMemento {
  private level: number;
  private health: number;
  private position: string;

  constructor(level: number, health: number, position: string) {
    this.level = level;
    this.health = health;
    this.position = position;
  }

  getLevel() {
    return this.level;
  }

  getHealth() {
    return this.health;
  }

  getPosition() {
    return this.position;
  }
}

// * El objeto Game es el que se va a guardar y restaurar.
// * Tiene un estado interno que se puede guardar y restaurar a través de los mementos.
class Game {
  private level: number = 1;
  private health: number = 100;
  private position: string = 'inicio';

  constructor() {
    console.log(`
      Jugando en el nivel ${this.level}
        salud: ${this.health}
        posición: ${this.position}
      `);
  }

  // Guarda el estado actual del juego y lo devuelve como un memento
  // El memento es un objeto que contiene el estado interno del objeto Game.
  save(): GameMemento {
    return new GameMemento(this.level, this.health, this.position);
  }

  // Inicia el juego y establece el estado inicial
  play(level: number, health: number, position: string): void {
    this.level = level;
    this.health = health;
    this.position = position;

    console.log(
      `Jugando en el nivel ${this.level}
        salud: ${this.health}
        posición: ${this.position}
        `
    );
  }

  // Restaura el estado del juego a un momento anterior
  // El memento es un objeto que contiene el estado interno del objeto Game.
  restore(memento: GameMemento): void {
    this.level = memento.getLevel();
    this.health = memento.getHealth();
    this.position = memento.getPosition();

    console.log(
      `\n%cProgreso restaurado 
      
      %cRestauración en el nivel %c${this.level}
        salud: ${this.health}
        posición: ${this.position}
        `,
      COLORS.yellow,
      COLORS.blue,
      COLORS.white
    );
  }
}

// * El objeto GameHistory es responsable de almacenar los mementos
// * y de restaurar el estado del juego a un momento anterior.
class GameHistory {
  private mementos: GameMemento[] = [];

  push(memento: GameMemento) {
    this.mementos.push(memento);
  }

  // Restaura el último estado guardado y lo elimina de la historia
  pop(): GameMemento | null {
    return this.mementos.pop() ?? null;
  }
}

function main() {
  const game = new Game();
  const history = new GameHistory();

  history.push(game.save());

  // Jugador avanza en el juego
  game.play(2, 90, 'Bosque Encantado');
  history.push(game.save());

  game.play(3, 70, 'Cueva Oscura');
  history.push(game.save());

  game.play(4, 50, 'Castillo del Dragón');
  console.log('%c\nEstado actual', COLORS.green);

  game.restore(history.pop()!);
  console.log(
    '%c\nDespués de restaurar el último estado guardado',
    COLORS.green
  );

  game.restore(history.pop()!);
  console.log(
    '%c\nDespués de restaurar el último estado guardado',
    COLORS.green
  );

  console.log('\n\n');
}

main();

// Logs:
// Jugando en el nivel 1
// salud: 100
// posición: inicio

// Jugando en el nivel 2
// salud: 90
// posición: Bosque Encantado

// Jugando en el nivel 3
// salud: 70
// posición: Cueva Oscura

// Jugando en el nivel 4
// salud: 50
// posición: Castillo del Dragón


// Estado actual

// Progreso restaurado

// Restauración en el nivel 3
// salud: 70
// posición: Cueva Oscura


// Después de restaurar el último estado guardado

// Progreso restaurado

// Restauración en el nivel 2
// salud: 90
// posición: Bosque Encantado


// Después de restaurar el último estado guardado

