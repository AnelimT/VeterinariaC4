import {Entity, hasMany, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model()
export class Petshop extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_empresa: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  nit: string;

  @property({
    type: 'string',
    required: true,
  })
  barrio: string;

  @hasMany(() => Cliente)
  clientes: Cliente[];

  constructor(data?: Partial<Petshop>) {
    super(data);
  }
}

export interface PetshopRelations {
  // describe navigational properties here
}

export type PetshopWithRelations = Petshop & PetshopRelations;
