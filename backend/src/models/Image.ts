import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity} from 'typeorm';
import Orphanage from './Orphanage';

@Entity('images')
export default class Image extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(()=> Orphanage, orphanage => orphanage.images)
    @JoinColumn({name:'orphanage_id'})
    orphanage: Orphanage;
}