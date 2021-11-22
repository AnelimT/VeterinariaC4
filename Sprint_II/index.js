require('dotenv').config()

const express = require('express')
const port = 3000 || process.env.port

//Libreria de sendgrid para envio de correos electronicos
const email = require('./email')
const sgMail = require('@sendgrid/mail')
const { SubscribedTrackInstance } = require('twilio/lib/rest/video/v1/room/roomParticipant/roomParticipantSubscribedTrack')
const { urlencoded } = require('express')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

//librerias de twilio ´para mensajes de texto

const accontSID = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

//para realizar pruebas con postman
const app= express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//creacion de la ruta del proyecto
//http://localhost:3000/
app.get('/', (req,res)=>{
    res.json({message:'Success'})
})

//Para poder ver la ruta en el navegador, se activa el listen()
app.listen(port,()=>{
    console.log(`Accede al sitio web dando clic:http://localhost:${port}`)    
})

app.post('/api/email/confirmacion', async(req,res,next)=>{
    //Llamamos funcion que estara en la clase email.js y que requiere
    //unos parametros que ingresa por postman
    try{
        res.json(await email.sendOrder(req.body))
    }catch(err){
        next(err)
    }
})

//Validar el codigo que nos devuelve la ejecucion del codigo, en caso de error
//mostrar todo el contenido del error
app.use((err, req, res, next)=>{
    // 100 => Informativo
    // 200 => No es un error, es status success
    // 300 => No esta disponible el recurso
    // 400 => No se encuentra la URI
    // 500 => error del servidor
    const statusCode = err.statusCode || 500
    console.error(err.message, err.stack)
    res.status(statusCode).json({'message': error.message})
    return
})

function getMessage(){
    const body = 'Mensaje enviado el 19/11/2021 04:30:00 p.m'
    return{
        to:'',
        from: 'edwpave@hotmail.com', 
        subject: 'Prueba sendgrid Go2',
        text: body,
        html: `<!DOCTYPE html>
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
                            ">Hola </h1>
                        
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
        </html>`
    }
}

async function sendEmail(){
    try{
        await sgMail.send(getMessage())
        console.log('Correo ha sido enviado')        
    }catch(err){
        console.error('No se pudo enviar el mensaje')
        console.error(err)
        if(err.response) console.error(err.response.body)
    }
}

(async()=>{
    console.log('Enviado correo electronico')
    await sendEmail
})