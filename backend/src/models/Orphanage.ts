import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, BaseEntity, PrimaryColumn} from 'typeorm';
import Image from './Image';

@Entity('orphanages')
export default class Orphanage extends BaseEntity  {

    @PrimaryGeneratedColumn('increment')
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column({default: false})
    open_on_weekends: boolean;

    @Column()
    contact: string;

    @Column({default: false})
    is_whatsapp: boolean;

    @OneToMany(()=> Image, image => image.orphanage, {
        cascade: ['insert', 'update']
    } )
    @JoinColumn({name: 'orphanage_id'})
    images: Image[];
}