const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function sendEmailConfirmationHTML(customerName, orderNro){
    return `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
    </head>
    <body style="background-color:#F4F7FF">
        <section style="
            height: 425px;
            margin-bottom: 800px;
            width: 600px;
            background-image: url('http://princesspetshop.com.co/img/bg.png'); width:600px "  > 
            <header >
                <nav style="
                    width: 100px;
                    margin-left:50px;
                    margin-right: auto;
                    margin-top: 0;
                    padding-top: 20px;
                    padding-bottom: 10px;;
                " >
                      <a href="#">
                        <img src="http://princesspetshop.com.co/img/logopetshop.png" alt="" width="100" >
                      </a>
                  
                  </nav>
            </header>
            <main style="
                width: 600px;
                height: 1000px;
                margin: auto;
                ">
                <div style="
                    margin: bottom 30px ;
                    background-color: #fff;
                    width: 600px;
                    height: 744;
                " >
                        <h1 style="
                        padding-top: 30px;
                        font-family:  sans-serif;
                        text-align: center;
                        font-size: 20px;
                        ">Hola ${customerName}</h1>
                    
                        <h2 style="
                            font-family: sans-serif;
                            font-weight: 300 ;
                            font-size: 1rem;
                            padding: 0 120px;
                            text-align: center;
                            color: #9CA0A8;
                            ">¡Te damos la bienvenida a Princess PetShop! Antes de empezar, debes confirmar tu dirección de correo electrónico.</h2>
                 
                    <div style="
                    width: 317px;
                    margin-left: auto;
                    margin-right: auto;
                    ">
                        <button style="
                         align-items:center ;
                        background-color: #9E446B;
                        width: 317px;
                        height: 47px;
                        outline: none;
                        border: none;
                        border-radius: 8px ;
                        margin-bottom: 30px;
                        margin-top: 20px;
                        color: white;
                        font-family: sans-serif;
                        font-weight: 300;
                        font-size: 13px;
                        ">Confirma tu correo electrónico</button>
                    </div>
                    <div style="
                        width: 497px;
                        margin: auto;
                    ">
                        <img src="http://princesspetshop.com.co/img/dog.png" alt="" width="497px">
    
                    </div>
                    <p style="
                    text-align: center;
                    font-family: sans-serif;
                    font-size: 1rem;
                    padding: 30px 0 50px 0px;
                    color: #9CA0A8;
                    ">Gracias,<br> El equipo de Princess PetShop</p>
                </div>
                    <div style="
                        width: 427px;
                        margin:  60px auto;
                        
                    ">
                        <img src="http://princesspetshop.com.co/img/foot.png" alt="" width="427px">
                    </div>
                    <hr style="width: 427px; color: #9CA0A8;">
                    <div>
                        <p style="
                        text-align: center;
                        font-family: sans-serif;
                        font-size: 13px;
                        color: #9CA0A8;
                        padding: 10px 50px;
                        ">
                            Si tiene alguna pregunta, no dude en enviarnos un mensaje a soporte@princesspetshop.com.co - Todos los derechos reservados.
                        </p>
                        <p style="
                        text-align: center;
                        font-family: sans-serif;
                        font-size: 13px;
                        padding-top: 10px;
                        padding-bottom: 50px;
                        color: #9CA0A8;
                        ">Pagos Contraentrega <br>Envíos a toda Colombia <br> <br><u>Terminos y condiciones</u> | <u>Politicas de privacidad</u></p>
                      
                    </div>
            </main>
        </section>
    </body>
    </html>`}

function getMessage(emailParams){
    return{
        to:emailParams.toEmail,
        from: 'edwpave@hotmail.com', 
        subject: 'Confirmacion de Orden de compra',
        text: `Hola ${emailParams.customerName}, te enviamos las imagenes de los productos comprados
        y la factura con el numero ${emailParams.orderNro}`,
        html: sendEmailConfirmationHTML(emailParams.customerName, emailParams.orderNro)
    }
}

async function sendOrder(emailParams){
    try{
        await sgMail.send(getMessage(emailParams))
        return {message:'Confirmacion de compra enviada'}        
    }catch(err){
        const message = 'No se pudo enviar la orden de compra.'
        console.error(message)
        console.error(err)
        if(err.response) console.error(err.response.body)
        return{message}
    }
}

module.exports={
    sendOrder
}