/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

import { COLORS } from '../helpers/colors.ts';
import { sleep } from '../helpers/sleep.ts';

/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */

// 1. Interfaz State
// Define los métodos que cada estado debe implementar.
interface State {
  name: string;

  insertMoney(): void; // Acción para insertar dinero
  selectProduct(): void; // Acción para seleccionar un producto
  dispenseProduct(): void; // Acción para dispensar un producto
}

// 2. Clase Contexto: VendingMachine
// Representa la máquina expendedora que cambia su comportamiento
// dependiendo del estado actual.
class VendingMachine {
  private state: State; // Estado actual de la máquina

  constructor() {
    // Inicializa la máquina en el estado "Esperando Dinero"
    this.state = new WaitingForMoney(this);
  }

  // Métodos que delegan las acciones al estado actual
  insertMoney() {
    this.state.insertMoney();
  }

  selectProduct() {
    this.state.selectProduct();
  }

  dispenseProduct() {
    this.state.dispenseProduct();
  }

  // Cambia el estado actual de la máquina
  setState(newState: State) {
    this.state = newState;
    console.log(`Estado cambió a: %c${newState.name}`, COLORS.yellow);
  }

  // Obtiene el nombre del estado actual
  getStateName(): string {
    return this.state.name;
  }
}

// 3. Estados concretos
// Cada clase representa un estado específico de la máquina expendedora
// e implementa el comportamiento correspondiente.

// Estado: Esperando Dinero
class WaitingForMoney implements State {
  public name: string = 'Esperando Dinero';
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  // Inserta dinero y cambia al estado "Seleccionando Producto"
  insertMoney(): void {
    console.log(
      'Dinero insertado: %cAhora puedes seleccionar un producto',
      COLORS.green
    );
    this.vendingMachine.setState(new ProductSelected(this.vendingMachine));
  }

  // No se puede seleccionar un producto sin insertar dinero
  selectProduct(): void {
    console.log('%cPrimero debes de insertar dinero.', COLORS.red);
  }

  // No se puede dispensar un producto sin insertar dinero
  dispenseProduct(): void {
    console.log('%cPrimero debes de insertar dinero.', COLORS.red);
  }
}

// Estado: Seleccionando Producto
class ProductSelected implements State {
  public name: string = 'Seleccionando Producto';
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  // No se puede insertar más dinero en este estado
  insertMoney(): void {
    console.log(
      '%cPor favor selecciona un producto - dinero ya insertado',
      COLORS.red
    );
  }

  // Selecciona un producto y cambia al estado "Despachando Producto"
  selectProduct(): void {
    this.vendingMachine.setState(new DispensingProduct(this.vendingMachine));
  }

  // No se puede dispensar un producto sin seleccionarlo primero
  dispenseProduct(): void {
    console.log(
      '%cPor favor selecciona un producto - antes de despacharlo',
      COLORS.red
    );
  }
}

// Estado: Despachando Producto
class DispensingProduct implements State {
  public name: string = 'Despachando producto';
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  // No se puede insertar dinero mientras se está despachando un producto
  insertMoney(): void {
    console.log('%cPor favor espera a que se entregue el producto', COLORS.red);
  }

  // No se puede seleccionar otro producto mientras se está despachando
  selectProduct(): void {
    console.log('%cProducto ya seleccionado y despachando', COLORS.red);
  }

  // Despacha el producto y regresa al estado "Esperando Dinero"
  dispenseProduct(): void {
    console.log(
      '%cProducto despachado, Cambiando estado a EsperandoDinero',
      COLORS.green
    );
    this.vendingMachine.setState(new WaitingForMoney(this.vendingMachine));
  }
}

// 4. Código Cliente
// Simula el uso de la máquina expendedora y su interacción con los estados.
async function main() {
  const vendingMachine = new VendingMachine();

  let selectedOption: string | null = '4';

  do {
    console.clear();
    console.log(
      `Selecciona una opción: %c${vendingMachine.getStateName()}`,
      COLORS.blue
    );

    selectedOption = prompt(
      `
        1. Insertar dinero
        2. Seleccionar producto
        3. Dispensar producto
        4. Salir

        opción: `
    );

    // Dependiendo de la opción seleccionada, se ejecuta una acción
    switch (selectedOption) {
      case '1':
        vendingMachine.insertMoney(); // Inserta dinero
        break;
      case '2':
        vendingMachine.selectProduct(); // Selecciona un producto
        break;
      case '3':
        vendingMachine.dispenseProduct(); // Dispensar producto
        break;
      case '4':
        console.log('Saliendo de sistema');
        break;
      default:
        console.log('Opción no válida');
    }

    // Pausa para simular el tiempo de espera
    await sleep(3000);
  } while (selectedOption !== '4');
}

main();