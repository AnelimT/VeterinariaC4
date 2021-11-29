import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  UsuarioAdministrador,
  Persona,
} from '../models';
import {UsuarioAdministradorRepository} from '../repositories';

export class UsuarioAdministradorPersonaController {
  constructor(
    @repository(UsuarioAdministradorRepository)
    public usuarioAdministradorRepository: UsuarioAdministradorRepository,
  ) { }

  @get('/usuario-administradors/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to UsuarioAdministrador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof UsuarioAdministrador.prototype.id,
  ): Promise<Persona> {
    return this.usuarioAdministradorRepository.persona(id);
  }
}
