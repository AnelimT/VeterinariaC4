import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pedido, Persona, PersonaRelations, UsuarioAdministrador} from '../models';
import {PedidoRepository} from './pedido.repository';
import {UsuarioAdministradorRepository} from './usuario-administrador.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly usuarioAdministradors: HasManyRepositoryFactory<UsuarioAdministrador, typeof Persona.prototype.id>;

  public readonly pedido: HasManyRepositoryFactory<Pedido, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioAdministradorRepository') protected usuarioAdministradorRepositoryGetter: Getter<UsuarioAdministradorRepository>, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>,
  ) {
    super(Persona, dataSource);
    this.pedido = this.createHasManyRepositoryFactoryFor('pedido', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedido', this.pedido.inclusionResolver);
    this.usuarioAdministradors = this.createHasManyRepositoryFactoryFor('usuarioAdministradors', usuarioAdministradorRepositoryGetter,);
    this.registerInclusionResolver('usuarioAdministradors', this.usuarioAdministradors.inclusionResolver);
  }
}
