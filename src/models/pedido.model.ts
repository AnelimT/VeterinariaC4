import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Producto} from './producto.model';

@model()
export class Pedido extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_pedido: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion_pedido: string;

  @property({
    type: 'string',
    required: true,
  })
  numero_guia: string;

  @property({
    type: 'number',
    required: true,
  })
  costo_envio: number;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @property({
    type: 'string',
    required: true,
  })
  metodo_pago: string;

  @property({
    type: 'string',
    required: true,
  })
  estado_pedido: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @hasMany(() => Producto)
  productos: Producto[];

  constructor(data?: Partial<Pedido>) {
    super(data);
  }
}

export interface PedidoRelations {
  // describe navigational properties here
}

export type PedidoWithRelations = Pedido & PedidoRelations;
