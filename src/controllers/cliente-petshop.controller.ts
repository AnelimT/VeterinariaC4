import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cliente,
  Petshop,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClientePetshopController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/petshop', {
    responses: {
      '200': {
        description: 'Petshop belonging to Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Petshop)},
          },
        },
      },
    },
  })
  async getPetshop(
    @param.path.string('id') id: typeof Cliente.prototype.id,
  ): Promise<Petshop> {
    return this.clienteRepository.petshop(id);
  }
}
