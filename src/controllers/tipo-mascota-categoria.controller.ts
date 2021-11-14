import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  TipoMascota,
  Categoria,
} from '../models';
import {TipoMascotaRepository} from '../repositories';

export class TipoMascotaCategoriaController {
  constructor(
    @repository(TipoMascotaRepository)
    public tipoMascotaRepository: TipoMascotaRepository,
  ) { }

  @get('/tipo-mascotas/{id}/categoria', {
    responses: {
      '200': {
        description: 'Categoria belonging to TipoMascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Categoria)},
          },
        },
      },
    },
  })
  async getCategoria(
    @param.path.string('id') id: typeof TipoMascota.prototype.id,
  ): Promise<Categoria> {
    return this.tipoMascotaRepository.categoria(id);
  }
}
