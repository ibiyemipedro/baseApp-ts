import { User } from "./user.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";

@Entity({ name: "companies" })
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  uuid: string;

  @Column({ length: 250 })
  name: string;

  @Column({ length: 250, nullable: true })
  email: string;

  @Column({ length: 5, nullable: true })
  countryCode: string;

  @Column({ length: 15, nullable: true })
  mobileNumber: string;

  @Column({ length: 350, nullable: true })
  address: string;

  @ManyToOne(() => User, (user) => user.company)
  users: User[];

  @OneToOne(() => User)
  @JoinColumn()
  owner: User;

  @Column({ length: 250, nullable: true })
  logoUrl: string;

  @Column({ nullable: true })
  companySize: string;

  @Column({ length: 250, nullable: true })
  domain: string;

  @Column({ length: 250, nullable: true })
  state: string;

  @Column({ length: 250, nullable: true })
  province: string;

  @Column({ length: 250, nullable: true })
  country: string;
}
