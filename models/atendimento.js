const connection = require('../infraestrutura/connection');
const moment = require('moment');

class Atendimento {
    add(atendimento, response) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        const atendimentoDatado = { ...atendimento, dataCriacao, data };

        const dataValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            }, {
                nome: 'cliente',
                valido: clienteValido,
                mensagem: 'Cliente deve ter pelo menos 5 caracteres'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if (existemErros)
            response.status(400).json(erros);
        else {
            const sql = 'INSERT INTO atendimento SET ?';

            connection.query(sql, atendimentoDatado, (erro, resultados) => {
                if (erro)
                    response.status(400).json(erro);
                else
                    response.status(201).json({ atendimento });
            });
        }
    };

    lista(response) {
        const sql = 'SELECT * FROM atendimento';

        connection.query(sql, (erro, resultados) => {
            if (erro) {
                response.status(400).json(erro);
            } else {
                response.status(200).json(resultados);
            }
        })
    };

    buscaPorId(id, response) {
        const sql = `SELECT * FROM atendimento WHERE id = ${id}`;

        connection.query(sql, (erro, resultados) => {
            const atendimento = resultados[0];

            if (erro)
                response.status(400).json(erro);
            else
                response.status(200).json(atendimento);
        });
    };

    altera(id, valores, response) {
        if (valores.data)
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        const sql = 'UPDATE atendimento SET ? WHERE id = ?';

        connection.query(sql, [valores, id], (erro, resultados) => {
            if (erro)
                response.status(400).json(erro);
            else
                response.status(200).json({ ...valores, id });
        });
    };

    deleta(id, response) {
        const sql = `DELETE FROM atendimento WHERE id = ${id}`;

        connection.query(sql, (erro, resultados) => {
            if (erro)
                response.status(400).json(erro);
            else
                response.status(200).json({ id });
        })
    };

};

module.exports = new Atendimento;