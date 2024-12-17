module.exports = {
  apps: [
    {
      name: "control-panel",
      script: "./dist/apps/control-panel/src/main.js",
      env_development: {
        APP_PORT: 9001,
      },
      watch: true,
    },

    {
      name: "user-apis",
      script: "./dist/apps/user-apis/src/main.js",
      env_development: {
        APP_PORT: 9002,
      },
      watch: true,
    },
  ],
};
