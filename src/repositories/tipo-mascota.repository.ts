import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TipoMascota, TipoMascotaRelations, Categoria} from '../models';
import {CategoriaRepository} from './categoria.repository';

export class TipoMascotaRepository extends DefaultCrudRepository<
  TipoMascota,
  typeof TipoMascota.prototype.id,
  TipoMascotaRelations
> {

  public readonly categoria: BelongsToAccessor<Categoria, typeof TipoMascota.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CategoriaRepository') protected categoriaRepositoryGetter: Getter<CategoriaRepository>,
  ) {
    super(TipoMascota, dataSource);
    this.categoria = this.createBelongsToAccessorFor('categoria', categoriaRepositoryGetter,);
    this.registerInclusionResolver('categoria', this.categoria.inclusionResolver);
  }
}
