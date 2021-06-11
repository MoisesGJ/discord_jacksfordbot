module.exports = {
    nombre: 'ping',
    alias: ['pg'],
    descripcion: '',
    run: (client, message, arg) =>{
        return message.channel.send('Hay una latencia de ' + Math.floor(message.client.ws.ping) + ' ms 🥴');
    }
}


