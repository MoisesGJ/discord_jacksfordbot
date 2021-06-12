module.exports = {
    nombre: 'join',
    alias: ['jn'],
    uso: '&jn',
    mod: 'yes',
    descripcion: 'Utilízame cuando desees emular una bienvenida.',
    run: (client, message, arg) =>{
        client.emit('guildMemberAdd', message.member);
    }
}