module.exports = [
  {
    migrations: [
      "src/migrations/*.ts",
      "dist/migrations/*{.ts,.js}"
    ],
    cli: {
      migrationsDir: 'src/migrations',
    },
  },
  {
    name: 'seed',
    migrations: ['src/seeds/*.ts'],
    cli: {
      migrationsDir: 'src/seeds',
    },
  },
];
