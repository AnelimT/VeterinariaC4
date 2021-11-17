import {Entity, model, property, hasMany} from '@loopback/repository';
import {UsuarioAdministrador} from './usuario-administrador.model';

@model()
export class Persona extends Entity {
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
  tipo_identificacion: string;

  @property({
    type: 'string',
    required: true,
  })
  numero_identificacion: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  usuario: string;

  @property({
    type: 'number',
    required: true,
  })
  password: number;

  @property({
    type: 'string',
  })
  usuarioAdministradorId?: string;

  @hasMany(() => UsuarioAdministrador)
  usuarioAdministradors: UsuarioAdministrador[];

  constructor(data?: Partial<Persona>) {
    super(data);
  }
}

export interface PersonaRelations {
  // describe navigational properties here
}

export type PersonaWithRelations = Persona & PersonaRelations;
