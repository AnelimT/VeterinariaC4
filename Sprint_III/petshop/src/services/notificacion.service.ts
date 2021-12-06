import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys} from '../Config/keys';
const sgMail = require('@sendgrid/mail')


@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
  SendEmail(destino: string,asunto: string, contenido:string){
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg={
      to:destino,
      from: Keys.email_origin,
      subject:asunto,
      html:contenido
    }
    sgMail
    .send(msg)
    .then(()=>{
      console.log('Email send')
    })
    .catch((error:any)=>{
      console.error(error)
    })
  }

}
