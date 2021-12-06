import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { PersonaRepository } from '../repositories';
import {Persona} from '../models'
import { Keys } from '../Config/keys';
const generador = require('password-generator');
const cryptoJS = require('crypto-js');
const jwt = require ('jsonwebtoken')

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(PersonaRepository)
    public persona_repositoy:PersonaRepository,
  ) {}

  /*
   * Add service methods here
   */
  GenerarClave(){
    let clave = generador(8,false);
    return clave;
  }

  CifrarClave(clave:string){
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  VerInfoPersona(user_email:string, password: string){
    try{
      let persona = this.persona_repositoy.findOne({
        where: {correo_electronico:user_email,password:password},
      });
      if (persona) {
        return persona
      }
      return false
    } catch{
      return false
    }
  }

  GenerarTokenJWT(persona:Persona){
    let token = jwt.sign({
      data: {
        id:persona.id,
        nombre:persona.nombre,
        correo_electronico: persona.correo_electronico,
      }
    },
    Keys.JWT)
    return token
  }

  ValidarToken(token:string){
    try{
      let datos = jwt.verify(token,Keys.JWT);
      return datos;
    }catch{
      return false;
    }
  }
}
