export default {
  apps: [
    {
      name: "backend",
      script: "dist/app.js",
      cwd: "./backend",
      interpreter: "ts-node",
    },
    {
      name: "frontend",
      script: "serve",
      args: "-s build",
      cwd: "./frontend",
      env: {
        PM2_SERVE_PATH: "./build",
        PM2_SERVE_PORT: 5173,
      },
    },
  ],
};
