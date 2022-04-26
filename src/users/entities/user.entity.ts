import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('text', { unique: true })
  email: string;

  @Field()
  @Column('text')
  password: string;

  @Field({ nullable: true })
  @Column('text', { name: 'first_name', nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  @Column('text', { name: 'last_name', nullable: true })
  lastName?: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
