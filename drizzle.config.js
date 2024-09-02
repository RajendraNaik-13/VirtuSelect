/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://VirtuSelect_owner:svc6RWlai8XZ@ep-wild-morning-a1uhnhf6.ap-southeast-1.aws.neon.tech/VirtuSelect?sslmode=require',
    }
  };