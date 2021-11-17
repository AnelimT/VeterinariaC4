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
import {Petshop} from '../models';
import {PetshopRepository} from '../repositories';

export class PetshopController {
  constructor(
    @repository(PetshopRepository)
    public petshopRepository : PetshopRepository,
  ) {}

  @post('/petshops')
  @response(200, {
    description: 'Petshop model instance',
    content: {'application/json': {schema: getModelSchemaRef(Petshop)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Petshop, {
            title: 'NewPetshop',
            exclude: ['id'],
          }),
        },
      },
    })
    petshop: Omit<Petshop, 'id'>,
  ): Promise<Petshop> {
    return this.petshopRepository.create(petshop);
  }

  @get('/petshops/count')
  @response(200, {
    description: 'Petshop model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Petshop) where?: Where<Petshop>,
  ): Promise<Count> {
    return this.petshopRepository.count(where);
  }

  @get('/petshops')
  @response(200, {
    description: 'Array of Petshop model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Petshop, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Petshop) filter?: Filter<Petshop>,
  ): Promise<Petshop[]> {
    return this.petshopRepository.find(filter);
  }

  @patch('/petshops')
  @response(200, {
    description: 'Petshop PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Petshop, {partial: true}),
        },
      },
    })
    petshop: Petshop,
    @param.where(Petshop) where?: Where<Petshop>,
  ): Promise<Count> {
    return this.petshopRepository.updateAll(petshop, where);
  }

  @get('/petshops/{id}')
  @response(200, {
    description: 'Petshop model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Petshop, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Petshop, {exclude: 'where'}) filter?: FilterExcludingWhere<Petshop>
  ): Promise<Petshop> {
    return this.petshopRepository.findById(id, filter);
  }

  @patch('/petshops/{id}')
  @response(204, {
    description: 'Petshop PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Petshop, {partial: true}),
        },
      },
    })
    petshop: Petshop,
  ): Promise<void> {
    await this.petshopRepository.updateById(id, petshop);
  }

  @put('/petshops/{id}')
  @response(204, {
    description: 'Petshop PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() petshop: Petshop,
  ): Promise<void> {
    await this.petshopRepository.replaceById(id, petshop);
  }

  @del('/petshops/{id}')
  @response(204, {
    description: 'Petshop DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.petshopRepository.deleteById(id);
  }
}
