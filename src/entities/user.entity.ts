import { UserStatus } from "./../constants/appConstants";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { UserRole } from "../constants/appConstants";
import { Company } from "./company.entity";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  uuid: string;

  @Column({ length: 250 })
  firstName: string;

  @Column({ length: 250 })
  lastName: string;

  @Column({ length: 250 })
  email: string;

  @Column({ length: 5 })
  countryCode: string;

  @Column({ length: 15 })
  mobileNumber: string;

  @Column({ length: 250, nullable: true })
  address: string;

  @Column({ length: 250, nullable: true })
  password: string;

  @Column({ length: 250, nullable: true })
  profileImageUrl: string;

  @Column({ length: 250, nullable: true })
  profession: string;

  @Column("simple-array", { nullable: true })
  interests: [string];

  @Column({ length: 250, nullable: true })
  gender: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ width: 25, default: 1 })
  permissionLevel: number;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @OneToOne(() => Company)
  @JoinColumn()
  company: Company;

  @Column({ length: 250, nullable: true })
  state: string;

  @Column({ length: 250, nullable: true })
  province: string;

  @Column({ length: 250, nullable: true })
  country: string;

  @Column({
    type: "enum",
    enum: UserStatus,
    default: UserStatus.INACTIVE,
  })
  status: UserStatus;

  @Column({ default: false })
  isVerified: boolean;
}
