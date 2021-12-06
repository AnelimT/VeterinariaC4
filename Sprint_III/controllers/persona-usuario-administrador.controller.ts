import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Persona,
  UsuarioAdministrador,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaUsuarioAdministradorController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/usuario-administradors', {
    responses: {
      '200': {
        description: 'Array of Persona has many UsuarioAdministrador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UsuarioAdministrador)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<UsuarioAdministrador>,
  ): Promise<UsuarioAdministrador[]> {
    return this.personaRepository.usuarioAdministradors(id).find(filter);
  }

  @post('/personas/{id}/usuario-administradors', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(UsuarioAdministrador)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioAdministrador, {
            title: 'NewUsuarioAdministradorInPersona',
            exclude: ['id'],
            optional: ['personaId']
          }),
        },
      },
    }) usuarioAdministrador: Omit<UsuarioAdministrador, 'id'>,
  ): Promise<UsuarioAdministrador> {
    return this.personaRepository.usuarioAdministradors(id).create(usuarioAdministrador);
  }

  @patch('/personas/{id}/usuario-administradors', {
    responses: {
      '200': {
        description: 'Persona.UsuarioAdministrador PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioAdministrador, {partial: true}),
        },
      },
    })
    usuarioAdministrador: Partial<UsuarioAdministrador>,
    @param.query.object('where', getWhereSchemaFor(UsuarioAdministrador)) where?: Where<UsuarioAdministrador>,
  ): Promise<Count> {
    return this.personaRepository.usuarioAdministradors(id).patch(usuarioAdministrador, where);
  }

  @del('/personas/{id}/usuario-administradors', {
    responses: {
      '200': {
        description: 'Persona.UsuarioAdministrador DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(UsuarioAdministrador)) where?: Where<UsuarioAdministrador>,
  ): Promise<Count> {
    return this.personaRepository.usuarioAdministradors(id).delete(where);
  }
}
