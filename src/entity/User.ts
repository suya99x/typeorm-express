import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";

import { Profile } from "../entity/profile";
import { Photo } from "./photo";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Photo, (photo) => photo.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  photos: Photo[];
}
