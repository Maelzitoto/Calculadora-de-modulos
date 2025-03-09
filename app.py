from flask import Flask, request, render_template
from calculos import calcular_intersecao, calcular_uniao

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        # Recupera os valores dos inputs com o mesmo nome "lista"
        listas = request.form.getlist("lista")
        
        conjuntos = []
        for item in listas:
            elementos = {elem.strip() for elem in item.split(",") if elem.strip()}
            if elementos:
                conjuntos.append(elementos)
        
        # Verifica qual operação foi solicitada
        operacao = request.form.get("operacao")
        
        if operacao == "intersecao":
            resultado = calcular_intersecao(conjuntos)
        elif operacao == "uniao":
            resultado = calcular_uniao(conjuntos)
        else:
            resultado = "Operação inválida."
        
        # Retorna o resultado no formato desejado
        return f"Resultado: {resultado}"
    
    # Renderiza o template apenas no GET
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)