/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 *
 * https://refactoring.guru/es/design-patterns/builder
 */

import { COLORS } from "../helpers/colors.ts";

class Computer {
    public cpu: string = 'cpu - not defined';
    public ram: string = 'ram - not defined';
    public storage: string = 'storage - not defined';
    public gpu?: string;

    displayConfiguration() {
        console.log(`CPU: ${this.cpu}`);
        console.log(`RAM: ${this.ram}`);
        console.log(`Storage: ${this.storage}`);
        console.log(`GPU: ${this.gpu || 'without GPU.'}`);
    }
}

class ComputerBuilder {
    private computer: Computer;

    constructor() {
        this.computer = new Computer();
    }

    setCPU(cpu: string) {
        this.computer.cpu = cpu;
        return this;
    }

    setRAM(ram: string) {
        this.computer.ram = ram;
        return this;
    }

    setStorage(storage: string) {
        this.computer.storage = storage;
        return this;
    }

    setGPU(gpu: string) {
        this.computer.gpu = gpu;
        return this;
    }

    build() {
        return this.computer;
    }
}

function main() {

    const computer = new ComputerBuilder()
        .setCPU('Intel i7')
        .setRAM('16GB')
        .setStorage('512GB SSD')
        // .setGPU('Nvidia RTX 3080')
        .build();

    console.log('%cComputer basic configuration:', COLORS.blue);
    computer.displayConfiguration();

    const computerGaming = new ComputerBuilder()
        .setCPU('Intel i9')
        .setRAM('32GB')
        .setStorage('1TB SSD')
        .setGPU('Nvidia RTX 3080')
        .build();

    console.log('%cComputer Gaming:', COLORS.blue);
    computerGaming.displayConfiguration();

}

main();