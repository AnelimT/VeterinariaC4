import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Persona} from '../models';
import {PersonaRepository} from '../repositories';
const generador = require("password-generator")
const cryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(PersonaRepository)
    public personRepository: PersonaRepository
  ) {}

  /*
   * Add service methods here
   */
  GenerarClave(){
    let clave = generador(8, false)
    return clave
  }

  CifrarClave(clave:string){
    let claveCifrada = cryptoJS.MD5(clave).toString()
    return claveCifrada
  }

  IdentificarPersona(usuario: string, clave: string){
    try{
      let p = this.personRepository.findOne({where: {email: usuario, password: clave}})
      if(p){
        return p
      }
      return false
    }catch{
      return false
    }
  }

  GenerarTokenJWT(Persona: Persona){
    let token = jwt.sign({
      data:{
        id: Persona.id,
        email: Persona.email,
        name: Persona.nombre
      }
    },
    Llaves.claveJWT)
    return token
  }

  ValidarTokenJWT(token: string){
    try{
      let datos = jwt.verify(token, Llaves.claveJWT)
      return datos
    }catch{
      return false
    }
  }
  

}
