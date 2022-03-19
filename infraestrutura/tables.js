class Tables {
    init(connection) {
        this.connection = connection;
        this.createAttendance();
    }

    createAttendance() {
        const sql = `CREATE TABLE IF NOT EXISTS atendimento (
                        id INTEGER NOT NULL AUTO_INCREMENT, 
                        cliente VARCHAR(50) NOT NULL, 
                        pet VARCHAR(20) NOT NULL, 
                        servico VARCHAR(20) NOT NULL,
                        data DATETIME NOT NULL,
                        data_criacao DATETIME NOT NULL, 
                        status VARCHAR(20) NOT NULL, 
                        observacoes TEXT,
                        PRIMARY KEY(id))`
        this.connection.query(sql, erro => {
            if (erro)
                console.log(erro);
            else {
                console.log('Tabela atendimento criada com sucesso');
            }
        });
    }
};

module.exports = new Tables;