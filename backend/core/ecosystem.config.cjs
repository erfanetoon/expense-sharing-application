const path = require("node:path");

// PM2 evaluates this file inside the CI runner's shell, which doesn't have the
// project env vars. Load the .env file written on the server so the PM2 app name
// (and other env) is read from the project's env file.
require("dotenv").config({ path: path.join(__dirname, ".env") });

const appName = process.env.APP_NAME || "backend-core";

module.exports = {
    apps: [
        {
            name: appName,
            cwd: __dirname,
            script: "./dist/main.js",
            exec_mode: "fork",
            instances: 1,
            autorestart: true,
            max_restarts: 10,
            restart_delay: 3000,
            min_uptime: "5s",
            kill_timeout: 10000,
            listen_timeout: 15000,
            env: {
                NODE_ENV: "production",
            },
            time: true,
            merge_logs: true,
            out_file: path.join(__dirname, "log", `pm2-${appName}-out.log`),
            error_file: path.join(__dirname, "log", `pm2-${appName}-error.log`),
            log_file: path.join(
                __dirname,
                "log",
                `pm2-${appName}-combined.log`,
            ),
            watch: false,
            // Optional: cap memory usage (uncomment if needed).
            // node_args: "--max-old-space-size=2048",
        },
    ],
};
