import "reflect-metadata";
import { DataSource } from "typeorm";
import { Photo } from "./entity/photo";
import { Profile } from "./entity/profile";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "typeorm",
  synchronize: true,
  logging: false,
  entities: [User, Profile, Photo],
  migrations: [],
  subscribers: [],
});
