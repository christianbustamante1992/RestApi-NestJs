import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Rol {
    @PrimaryGeneratedColumn()
    rol_id: number;

    @Column({type : "int", name : "rol_estado", length : 1, nullable: false})
    rol_estado: number;

    @Column({type : "string", name : "rol_nombre", length : 100, nullable: false})
    rol_nombre: number;
}

