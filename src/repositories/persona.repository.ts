import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Persona, PersonaRelations, UsuarioAdministrador} from '../models';
import {UsuarioAdministradorRepository} from './usuario-administrador.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly usuarioAdministradors: HasManyRepositoryFactory<UsuarioAdministrador, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioAdministradorRepository') protected usuarioAdministradorRepositoryGetter: Getter<UsuarioAdministradorRepository>,
  ) {
    super(Persona, dataSource);
    this.usuarioAdministradors = this.createHasManyRepositoryFactoryFor('usuarioAdministradors', usuarioAdministradorRepositoryGetter,);
    this.registerInclusionResolver('usuarioAdministradors', this.usuarioAdministradors.inclusionResolver);
  }
}
