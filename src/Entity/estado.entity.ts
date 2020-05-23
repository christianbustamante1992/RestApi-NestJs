import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Estado {
    @PrimaryGeneratedColumn()
    estado_id: number;

    @Column({type : "int", name : "estado_estado", length : 1, nullable: false})
    estado_estado: number;

    @Column({type : "string", name : "estado_nombre", length : 100, nullable: false})
    estado_nombre: number;
}

