module.exports = {
  apps: [
    {
      name: "workspace-api",
      script: "npm",
      automation: false,
      args: "run pm2",
      watch: true,
      env: {
        "PORT": 7500,
        "NODE_ENV": "development"
      },
      env_production: {
        "NODE_ENV": "production",
      },
      watch_delay: 3000,
      ignore_watch: ["node_modules"],
    }
  ]
}