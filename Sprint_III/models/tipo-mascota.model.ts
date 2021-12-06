import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Categoria} from './categoria.model';

@model()
export class TipoMascota extends Entity {
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
  tipo_mascota: string;

  @belongsTo(() => Categoria)
  categoriaId: string;

  constructor(data?: Partial<TipoMascota>) {
    super(data);
  }
}

export interface TipoMascotaRelations {
  // describe navigational properties here
}

export type TipoMascotaWithRelations = TipoMascota & TipoMascotaRelations;
