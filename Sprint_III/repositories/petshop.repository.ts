import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Petshop, PetshopRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class PetshopRepository extends DefaultCrudRepository<
  Petshop,
  typeof Petshop.prototype.id,
  PetshopRelations
> {

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Petshop.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Petshop, dataSource);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
  }
}
