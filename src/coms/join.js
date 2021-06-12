module.exports = {
    nombre: 'join',
    alias: ['jn'],
    descripcion: '',
    run: (client, message, arg) =>{
        client.emit('guildMemberAdd', message.member);
    }
}