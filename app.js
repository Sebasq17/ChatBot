const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

// Flujo principal
const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'buenas', 'buenos dias','atras','me dieron tu contacto','me dijeron','bueno'])
    .addAnswer('Bienvenido, Se ha  comunicado con DISTRICOOL. Empresa autorizada de helados tonny para la comercialización y distribución de sus productos a través de domicilio, cuéntanos en qué te podemos ayudar')
    .addAnswer([
        '1. Te interesa ver el catálogo de productos?',
        '2. Estás interesado en vender nuestros productos?',
        '3. Comunicarte con un asesor de ventas',
        '4. Volver al menú principal',
        'Si eres cliente habitual, en un momento te atenderemos'
    ]);

// Flujo para devolver al menú principal
const flowDevolver = addKeyword(['4'])
    .addAnswer([
        '1. Te interesa ver el catálogo de productos?',
        '2. Estás interesado en vender nuestros productos?',
        '3. Comunicarte con un asesor de ventas',
    ]);

// Flujo secundario
const flowSecundario = addKeyword(['Gracias', 'Perfecto', 'Listo'])
    .addAnswer(['Un placer atenderte']);

// Flujo para el catálogo de productos
const flowTercero = addKeyword(['1'])
    .addAnswer([
        'Aquí tienes el catálogo de nuestros productos 🍦 :',
        'https://drive.google.com/file/d/13mJPxE1VdhscKJ-wiaycDpzlwOCE6oOt/view',
        '4. Si desea volver al menú principal'
    ]);

// Flujo para vender productos
const flowCuarto = addKeyword(['2'])
    .addAnswer([
        'Para vender nuestros productos, debes cumplir con los siguientes requisitos 👇 ',
        'Nombre completo, Fotocopia de la cédula, correo electrónico, 1 referencia personal, 1 referencia familiar',
        'Inversión inicial (Productos para el congelador) $650.000',
        'Para más información, escribe *ASESOR* para que un asesor se comunique contigo', // Negrita
        // 'Para más información, escribe `ASESOR` para que un asesor se comunique contigo', // Monoespaciado
    ]);

// Flujo para comunicarte con un asesor
const flowQuinto = addKeyword(['3','asesor'])
    .addAnswer([
        'En un momento te atenderemos, si tienes una duda o inquietud, puedes escribirnos mientras un asesor se comunica contigo'
    ]);

// Función principal para inicializar el bot
const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowPrincipal, flowSecundario, flowTercero, flowDevolver, flowCuarto, flowQuinto]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
};

main().catch(err => console.log('Unexpected error:', err));
