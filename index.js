const express = require('express');
const cors = require('cors');
const fs = require('fs'); // Importa o módulo de arquivos
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/calcular-imc', (req, res) => {
    const { peso, altura } = req.body;

    if (!peso || !altura) {
        return res.status(400).json({ error: "Dados inválidos." });
    }

    const imc = peso / (altura * altura);
    let classificacao = "";

    // ... (sua lógica de IF/ELSE da classificação aqui) ...
    if (imc < 18.5) classificacao = "Abaixo do peso";
    else if (imc < 24.9) classificacao = "Peso normal";
    else if (imc < 29.9) classificacao = "Sobrepeso";
    else classificacao = "Obesidade";

    const resultado = imc.toFixed(2);

    // --- LÓGICA PARA SALVAR NO ARQUIVO ---
    const dataHora = new Date().toLocaleString('pt-BR');
    const log = `Data: ${dataHora} | Peso: ${peso}kg | Altura: ${altura}m | IMC: ${resultado} | Status: ${classificacao}\n`;

    fs.appendFile('dados.txt', log, (err) => {
        if (err) {
            console.error("Erro ao salvar no arquivo:", err);
        } else {
            console.log("Cálculo salvo com sucesso no arquivo dados.txt!");
        }
    });
    // -------------------------------------

    return res.json({
        imc: resultado,
        classificacao: classificacao
    });
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
