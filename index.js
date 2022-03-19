const customExpress = require('./config/customExpress');
const connection = require('./infraestrutura/connection');
const Tables = require('./infraestrutura/tables');

connection.connect(erro => {
    if (erro)
        console.log(erro);
    else {
        console.log('Conectado com sucesso');
        Tables.init(connection);
        const app = customExpress();
        app.listen(3000, () => console.log('Servidor esta executando na porta 3000'));
    }
});



