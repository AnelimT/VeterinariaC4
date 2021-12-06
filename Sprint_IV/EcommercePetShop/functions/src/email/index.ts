import * as funtions from 'firebase-functions';

const sendgridApiKey = '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';
export const sendEmail = funtions.firestore.document('contacts/{documentUid}').onCreate(async(event:any)=>{
  console.log('event',event);
  const contacts: any = event.data();
  const welcomeEmail:any = {
    to: contacts.email,
    from:'soporte@princesspetshop.com.co',
    templateId:'d-bd6f4e3020a24a0cb5b2de971494656',
    dynamic_template_data:{
      FirstName: contacts.FirstName,
      LastName: contacts.LastName
    }
  };
  return sendgridSendEmail(welcomeEmail);
});

function sendgridSendEmail(data:any): Promise<void>{
  console.log('Enviando correo con la siguiente información: ', data);
  const sgMail = require ('@sendgrid/mail');
  sgMail.setApiKey(sendgridApiKey);
  return sgMail
    .send(data)
    .then((response:any[])=> console.log('Mensaje Enviado ', response))
    .catch((error:any[])=>console.log('No se pudo enviar el mensaje', error));
}
