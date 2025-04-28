/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 *
 */

import { COLORS } from '../helpers/colors.ts';

/**
 * * En este ejemplo, tenemos un portal mágico que permite a los jugadores
 * * entrar a una sala secreta. Sin embargo, solo los jugadores de nivel 10 o más
 * * pueden entrar. El patrón Proxy se utiliza para controlar el acceso a la sala
 * * secreta y verificar el nivel del jugador antes de permitirle entrar.
 */

// 1. Clase que representa al jugador - Player
// Contiene las propiedades del jugador, como su nombre y nivel.
class Player {
  name: string;
  level: number;

  constructor(name: string, level: number) {
    this.name = name;
    this.level = level;
  }
}

// 2. Interfaz Room
// Define el contrato para las salas, que incluye el método "enter".
interface Room {
  enter(player: Player): void;
}

// 3. Clase que representa la sala secreta - SecretRoom
// Implementa la interfaz Room y define el comportamiento de la sala secreta.
class SecretRoom implements Room {
  enter(player: Player): void {
    console.log(`%cBienvenido a la sala secreta, ${player.name}`, COLORS.blue);
    console.log(`Una gran enemigo te espera`);
  }
}

// 4. Clase Proxy - MagicPortal
// Actúa como intermediario entre el jugador y la sala secreta.
// Controla el acceso verificando el nivel del jugador antes de permitirle entrar.
class MagicPortal implements Room {
  private secretRom: Room;

  constructor(room: Room) {
    this.secretRom = room;
  }

  enter(player: Player): void {
    // Verificar si el jugador tiene el nivel requerido para entrar
    if (player.level >= 10) {
      this.secretRom.enter(player); // Permitir el acceso a la sala secreta
      return;
    }

    // Denegar el acceso si el nivel del jugador es insuficiente
    console.log(
      `%cLo siento mucho ${player.name}, Tu nivel ${player.level}, es muy bajo, necesitas nivel 10`,
      COLORS.red
    );
  }
}

// 5. Código Cliente para probar el Proxy
// Crea jugadores y un portal mágico que controla el acceso a la sala secreta.
function main() {
  const portal = new MagicPortal(new SecretRoom()); // Proxy

  const player1 = new Player('Aventurero A', 5); // Jugador con nivel insuficiente
  const player2 = new Player('Aventurero B', 15); // Jugador con nivel suficiente

  console.log('%cAventurero A intenta entrar al portal', COLORS.blue);
  portal.enter(player1); // Debería denegar el acceso

  console.log('%c\nAventurero B intenta entrar al portal', COLORS.blue);
  portal.enter(player2); // Debería permitir el acceso
}

main();
