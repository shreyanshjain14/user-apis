module.exports = {
  apps: [
    {
      name: "control-panel",
      script: "./dist/apps/control-panel/src/main.js",
      env_production: {
        APP_PORT: 9909,
      },
    },
  ],
};
