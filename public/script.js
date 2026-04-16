const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para processar JSON
app.use(express.json());

app.post('/calcular-imc', (req, res) => {
    const { peso, altura } = req.body;

    // Validação básica
    if (!peso || !altura) {
        return res.status(400).json({ error: "Por favor, envie peso e altura." });
    }

    // Cálculo do IMC
    const imc = peso / (altura * altura);
    
    // Lógica de classificação
    let classificacao = "";

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    } else if (imc < 24.9) {
        classificacao = "Peso normal";
    } else if (imc < 29.9) {
        classificacao = "Sobrepeso";
    } else if (imc < 34.9) {
        classificacao = "Obesidade Grau I";
    } else if (imc < 39.9) {
        classificacao = "Obesidade Grau II";
    } else {
        classificacao = "Obesidade Grau III (Mórbida)";
    }

    return res.json({
        imc: imc.toFixed(2),
        classificacao: classificacao
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});