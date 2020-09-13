import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({type: 'varchar', length: 50, nullable: false, unique: true})
    public username: string;

    @Column({type: 'text', nullable: false, unique: true})
    public email: string;

    @Column({type: 'varchar', length: 255, nullable: false})
    @Exclude()
    public password: string;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}