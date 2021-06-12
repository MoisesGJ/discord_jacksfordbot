const fs = require('fs');

module.exports = {
    nombre: 'aggcom',
    alias: ['ac'],
    descripcion: '',
    run: (client, message, arg) =>{
        console.log(arg);

        let llam = arg[0];
        let resp = "";

        for (let i = 1; i <= (arg.length - 1); i++) {                        
            resp += arg[i] + " ";
        }

        if (resp.includes('{usr}')) resp = resp.replace('{usr}', message.author);

        
        let baseMsg = "module.exports = {\n\tnombre: '"+`${llam}`+"',\n\talias: [],\n\tdescripcion: '',\n\trun: (client, message, arg) =>{\n\t\treturn message.channel.send('"+`${resp}`+"');\n\t}\n}";
            
        fs.writeFile('src/coms/'+llam+'.js', baseMsg, function (err) {
            if (err) return console.log(err);
            console.log('Archivo creado');
            console.log(message.content);

            /*message.delete({ timeout: 5000 })
            .then(msg => console.log(`Mensaje eliminado de ${msg.author.username}`))
            .catch(console.error);*/

        });
               
        return message.channel.send('Comando creado.');
    }
}