/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

import { configManager } from "./singleton/config-manager.ts";


configManager.setConfig('host', 'localhost');
configManager.setConfig('port', '8080');
configManager.setConfig('user', 'admin');
configManager.setConfig('password', 'admin123');

const host = configManager.getConfig('host'); // localhost
console.log("🚀 ~ host:", host)
const port = configManager.getConfig('port'); // 8080
console.log("🚀 ~ port:", port)
const user = configManager.getConfig('user'); // admin
console.log("🚀 ~ user:", user)
const passWord = configManager.getConfig('password'); // admin123
console.log("🚀 ~ passWord:", passWord)


const allConfigs = configManager.getAllConfig(); // { host: 'localhost', port:
console.log("🚀 ~ allConfigs:", allConfigs)
