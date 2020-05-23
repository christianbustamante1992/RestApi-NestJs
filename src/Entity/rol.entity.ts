import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity()
export class Rol {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(
        type => Usuario,
        usuario => usuario.rol,
    )
    usuario: Usuario[];

    @Column({type : "int", name : "rol_estado", nullable: false})
    rol_estado: number;

    @Column({type : "varchar", name : "rol_nombre", length : 100, nullable: false})
    rol_nombre: string;
}

