import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column } from 'typeorm';
import { Estado } from './estado.entity';
import { Rol } from './rol.entity';

@Entity()
export class  Usuario{

    @PrimaryGeneratedColumn()
    usuario_id: number;

    @OneToOne(type => Estado)
    @JoinColumn()
    estado_id: number;

    @OneToOne(type => Rol)
    @JoinColumn()
    rol_id: number;

    @Column({type : "varchar", name : "usuario_cedula", length : 13, nullable: false, unique: true})
    usuario_cedula: string;

    @Column({type : "varchar", name : "usuario_nombre", length : 200, nullable: false})
    usuario_nombre: string;

    @Column({type : "varchar", name : "usuario_apellido", length : 200, nullable: false})
    usuario_apellido: string;

    @Column({type : "varchar", name : "usuario_correo", length : 100, nullable: false, unique: true})
    usuario_correo: string;

    @Column({type : "varchar", name : "usuario_telefono", length : 10, nullable: false, unique: true})
    usuario_telefono: string;

    @Column({type : "varchar", name : "usuario_celular", length : 10, nullable: false, unique: true})
    usuario_celular: string;

    @Column({type : "varchar", name : "usuario_celularjob", length : 10, nullable: true})
    usuario_celularjob: string;

    @Column({type : "varchar", name : "usuario_direccion", length : 200, nullable: true})
    usuario_direccion: string;

    @Column({type : "varchar", name : "usuario_nombrefoto", length : 200, nullable: true})
    usuario_nombrefoto: string;

    @Column({type : "varchar", name : "usuario_contrasena", length : 200, nullable: true})
    usuario_contrasena: string;
}

