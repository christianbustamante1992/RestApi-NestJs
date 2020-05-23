import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity()
export class Estado {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(
        type => Usuario,
        usuario => usuario.estado,
    )
    usuario: Usuario[];

    @Column({type : "int", name : "estado_estado", nullable: false})
    estado_estado: number;

    @Column({type : "varchar", name : "estado_nombre", length : 100, nullable: false})
    estado_nombre: string;
}

