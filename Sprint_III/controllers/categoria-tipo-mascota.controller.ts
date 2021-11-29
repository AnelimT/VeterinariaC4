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
  Categoria,
  TipoMascota,
} from '../models';
import {CategoriaRepository} from '../repositories';

export class CategoriaTipoMascotaController {
  constructor(
    @repository(CategoriaRepository) protected categoriaRepository: CategoriaRepository,
  ) { }

  @get('/categorias/{id}/tipo-mascotas', {
    responses: {
      '200': {
        description: 'Array of Categoria has many TipoMascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoMascota)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<TipoMascota>,
  ): Promise<TipoMascota[]> {
    return this.categoriaRepository.tipoMascotas(id).find(filter);
  }

  @post('/categorias/{id}/tipo-mascotas', {
    responses: {
      '200': {
        description: 'Categoria model instance',
        content: {'application/json': {schema: getModelSchemaRef(TipoMascota)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Categoria.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoMascota, {
            title: 'NewTipoMascotaInCategoria',
            exclude: ['id'],
            optional: ['categoriaId']
          }),
        },
      },
    }) tipoMascota: Omit<TipoMascota, 'id'>,
  ): Promise<TipoMascota> {
    return this.categoriaRepository.tipoMascotas(id).create(tipoMascota);
  }

  @patch('/categorias/{id}/tipo-mascotas', {
    responses: {
      '200': {
        description: 'Categoria.TipoMascota PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoMascota, {partial: true}),
        },
      },
    })
    tipoMascota: Partial<TipoMascota>,
    @param.query.object('where', getWhereSchemaFor(TipoMascota)) where?: Where<TipoMascota>,
  ): Promise<Count> {
    return this.categoriaRepository.tipoMascotas(id).patch(tipoMascota, where);
  }

  @del('/categorias/{id}/tipo-mascotas', {
    responses: {
      '200': {
        description: 'Categoria.TipoMascota DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(TipoMascota)) where?: Where<TipoMascota>,
  ): Promise<Count> {
    return this.categoriaRepository.tipoMascotas(id).delete(where);
  }
}
