import chalk from "chalk";

export function log(text: string, style: "info" | "err" | "warn" | "done") {
    const styles = {
        info: { prefix: chalk.blue("==> INFO: "), logFunction: console.log },
        err: { prefix: chalk.red("==> ERROR: "), logFunction: console.error },
        warn: { prefix: chalk.yellow("==> WARNING: "), logFunction: console.warn },
        done: { prefix: chalk.green("==> SUCCESS: "), logFunction: console.log },
    };

    const selectedStyle = styles[style];
    selectedStyle.logFunction(`${Date.now()} ${selectedStyle.prefix || { logFunction: console.log } || ""} ${text}`);
};


export function isSnowflake(id: string): boolean {
    return /^\d+$/.test(id);
};
