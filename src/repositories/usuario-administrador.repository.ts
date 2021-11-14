import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {UsuarioAdministrador, UsuarioAdministradorRelations, Persona} from '../models';
import {PersonaRepository} from './persona.repository';

export class UsuarioAdministradorRepository extends DefaultCrudRepository<
  UsuarioAdministrador,
  typeof UsuarioAdministrador.prototype.id,
  UsuarioAdministradorRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof UsuarioAdministrador.prototype.id>;

  public readonly personas: HasManyRepositoryFactory<Persona, typeof UsuarioAdministrador.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(UsuarioAdministrador, dataSource);
    this.personas = this.createHasManyRepositoryFactoryFor('personas', personaRepositoryGetter,);
    this.registerInclusionResolver('personas', this.personas.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
