module.exports = {
    nombre: 'ping',
    alias: ['pg'],
    uso: '&pg',
    mod: 'no',
    descripcion: 'Utilízame cuando desees saber mi latencia desde mi servidor a discord.',
    run: (client, message, arg) =>{
        return message.channel.send('Hay una latencia de ' + Math.floor(message.client.ws.ping) + ' ms 🥴');
    }
}


