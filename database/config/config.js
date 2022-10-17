{
  "development": {
    "url": "postgres://root:password@localhost:5432/sig-db",
    "dialect": "postgres"
  },
  "test": {
    "url": "postgres://sig_api:KL7N9n0tjFiShgt@top2.nearest.of.sig-api-db.internal:5432/sig_api",
    "dialect": "postgres"
  },
  "production": {
    "url": ${process.env.DATABASE_URL},
    "dialect": "postgres"
  }
}
