import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {UsuarioAdministrador} from '../models';
import {UsuarioAdministradorRepository} from '../repositories';

export class UsuarioAdministradorController {
  constructor(
    @repository(UsuarioAdministradorRepository)
    public usuarioAdministradorRepository : UsuarioAdministradorRepository,
  ) {}

  @post('/usuario-administradors')
  @response(200, {
    description: 'UsuarioAdministrador model instance',
    content: {'application/json': {schema: getModelSchemaRef(UsuarioAdministrador)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioAdministrador, {
            title: 'NewUsuarioAdministrador',
            exclude: ['id'],
          }),
        },
      },
    })
    usuarioAdministrador: Omit<UsuarioAdministrador, 'id'>,
  ): Promise<UsuarioAdministrador> {
    return this.usuarioAdministradorRepository.create(usuarioAdministrador);
  }

  @get('/usuario-administradors/count')
  @response(200, {
    description: 'UsuarioAdministrador model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UsuarioAdministrador) where?: Where<UsuarioAdministrador>,
  ): Promise<Count> {
    return this.usuarioAdministradorRepository.count(where);
  }

  @get('/usuario-administradors')
  @response(200, {
    description: 'Array of UsuarioAdministrador model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UsuarioAdministrador, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UsuarioAdministrador) filter?: Filter<UsuarioAdministrador>,
  ): Promise<UsuarioAdministrador[]> {
    return this.usuarioAdministradorRepository.find(filter);
  }

  @patch('/usuario-administradors')
  @response(200, {
    description: 'UsuarioAdministrador PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioAdministrador, {partial: true}),
        },
      },
    })
    usuarioAdministrador: UsuarioAdministrador,
    @param.where(UsuarioAdministrador) where?: Where<UsuarioAdministrador>,
  ): Promise<Count> {
    return this.usuarioAdministradorRepository.updateAll(usuarioAdministrador, where);
  }

  @get('/usuario-administradors/{id}')
  @response(200, {
    description: 'UsuarioAdministrador model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UsuarioAdministrador, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(UsuarioAdministrador, {exclude: 'where'}) filter?: FilterExcludingWhere<UsuarioAdministrador>
  ): Promise<UsuarioAdministrador> {
    return this.usuarioAdministradorRepository.findById(id, filter);
  }

  @patch('/usuario-administradors/{id}')
  @response(204, {
    description: 'UsuarioAdministrador PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioAdministrador, {partial: true}),
        },
      },
    })
    usuarioAdministrador: UsuarioAdministrador,
  ): Promise<void> {
    await this.usuarioAdministradorRepository.updateById(id, usuarioAdministrador);
  }

  @put('/usuario-administradors/{id}')
  @response(204, {
    description: 'UsuarioAdministrador PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuarioAdministrador: UsuarioAdministrador,
  ): Promise<void> {
    await this.usuarioAdministradorRepository.replaceById(id, usuarioAdministrador);
  }

  @del('/usuario-administradors/{id}')
  @response(204, {
    description: 'UsuarioAdministrador DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioAdministradorRepository.deleteById(id);
  }
}
