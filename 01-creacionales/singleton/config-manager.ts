

class ConfigManager {
    private config: Record<string, string> = {};

    // Método publico para agregar una clave y valor a la configuración
    public setConfig (key: string, value: string): void {
        this.config[key] = value;
    }

    // Método publico para obtener la configuración por clave
    public getConfig (key: string): string | null {
        return this.config[key];
    }

    // Método publico para obtener todas las configuraciones
    public getAllConfig (): Record<string, string> {
        return this.config;
    }
}

export const configManager = new ConfigManager();