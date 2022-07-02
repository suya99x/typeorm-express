import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => User, (user) => user.photos)
  user: User;
}
