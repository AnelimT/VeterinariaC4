import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Categoria, CategoriaRelations, Producto, TipoMascota} from '../models';
import {ProductoRepository} from './producto.repository';
import {TipoMascotaRepository} from './tipo-mascota.repository';

export class CategoriaRepository extends DefaultCrudRepository<
  Categoria,
  typeof Categoria.prototype.id,
  CategoriaRelations
> {

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Categoria.prototype.id>;

  public readonly tipoMascotas: HasManyRepositoryFactory<TipoMascota, typeof Categoria.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('TipoMascotaRepository') protected tipoMascotaRepositoryGetter: Getter<TipoMascotaRepository>,
  ) {
    super(Categoria, dataSource);
    this.tipoMascotas = this.createHasManyRepositoryFactoryFor('tipoMascotas', tipoMascotaRepositoryGetter,);
    this.registerInclusionResolver('tipoMascotas', this.tipoMascotas.inclusionResolver);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
  }
}
