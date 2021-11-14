import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Persona} from './persona.model';

@model()
export class UsuarioAdministrador extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estado: boolean;

  @belongsTo(() => Persona)
  personaId: string;

  @hasMany(() => Persona)
  personas: Persona[];

  constructor(data?: Partial<UsuarioAdministrador>) {
    super(data);
  }
}

export interface UsuarioAdministradorRelations {
  // describe navigational properties here
}

export type UsuarioAdministradorWithRelations = UsuarioAdministrador & UsuarioAdministradorRelations;
