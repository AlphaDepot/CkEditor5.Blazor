import {EditorConfig} from "ckeditor5";
import {communityPlugins, corePlugins, premiumPlugins} from "./editors-configuration.ts";


export function configFactory(config?: EditorConfig) {
    if (!(config && Object.keys(config).length > 0)) {
        console.log("No config provided");
        return config = {
            licenseKey: "GPL",
        }
    }

    // Register the plugins
    const pluginNames = config.plugins || [];
    config.plugins = pluginNames.flatMap((plugin) => {
        if (typeof plugin !== "string") {
            return [plugin];
        }

        const plugins = [];

        // Add the core plugins
        if (corePlugins[plugin]) {
            plugins.push(corePlugins[plugin]);
        }

        // Add the premium plugins while checking  for the license key
        if (premiumPlugins[plugin]) {
            if (!config?.licenseKey || config?.licenseKey === "" || config?.licenseKey === "GPL") {
                throw new Error(`The plugin ${plugin} requires a license key.`);
            }
            plugins.push(premiumPlugins[plugin]);
        }

        // Add the community plugins
        if (communityPlugins[plugin]) {
            plugins.push(communityPlugins[plugin]);
        }

        return plugins;
    });

    return config;
}