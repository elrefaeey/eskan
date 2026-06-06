module.exports = {
  apps: [
    {
      name: "eskanelmansoura",
      script: "npm",
      args: "start", 
      cwd: "/root/eskanelmansoura", 
      watch: false, 
      autorestart: true,
      max_restarts: 10,
      env: {
        NODE_ENV: "production",
        PORT: 3005,
      },
      env_development: {
        NODE_ENV: "development",
        PORT: 3005,
      },
    },
  ],
};
