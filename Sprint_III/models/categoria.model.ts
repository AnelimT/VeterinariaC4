import {Entity, model, property, hasMany} from '@loopback/repository';
import {Producto} from './producto.model';
import {TipoMascota} from './tipo-mascota.model';

@model()
export class Categoria extends Entity {
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
  categoria: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @hasMany(() => Producto)
  productos: Producto[];

  @hasMany(() => TipoMascota)
  tipoMascotas: TipoMascota[];

  constructor(data?: Partial<Categoria>) {
    super(data);
  }
}

export interface CategoriaRelations {
  // describe navigational properties here
}

export type CategoriaWithRelations = Categoria & CategoriaRelations;
