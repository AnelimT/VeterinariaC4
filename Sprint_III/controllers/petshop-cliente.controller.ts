import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Cliente, Petshop
} from '../models';
import {PetshopRepository} from '../repositories';

export class PetshopClienteController {
  constructor(
    @repository(PetshopRepository) protected petshopRepository: PetshopRepository,
  ) { }

  @get('/petshops/{id}/clientes', {
    responses: {
      '200': {
        description: 'Array of Petshop has many Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.petshopRepository.clientes(id).find(filter);
  }

  @post('/petshops/{id}/clientes', {
    responses: {
      '200': {
        description: 'Petshop model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Petshop.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInPetshop',
            exclude: ['id'],
          }),
        },
      },
    }) cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {
    return this.petshopRepository.clientes(id).create(cliente);
  }

  @patch('/petshops/{id}/clientes', {
    responses: {
      '200': {
        description: 'Petshop.Cliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Partial<Cliente>,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.petshopRepository.clientes(id).patch(cliente, where);
  }

  @del('/petshops/{id}/clientes', {
    responses: {
      '200': {
        description: 'Petshop.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.petshopRepository.clientes(id).delete(where);
  }
}
