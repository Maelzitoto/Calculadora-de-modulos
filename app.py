from flask import Flask, request, render_template
from calculos import calcular_intersecao  # Importe a função de cálculo

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        # Recupera os valores dos inputs com o mesmo nome "lista"
        listas = request.form.getlist("lista")
        
        conjuntos = []
        for item in listas:
            # Usa vírgula como delimitador e remove espaços extras
            elementos = {elem.strip() for elem in item.split(",") if elem.strip()}
            if elementos:
                conjuntos.append(elementos)
        
        # Calcula a interseção
        resultado = calcular_intersecao(conjuntos)
        
        # Retorna o resultado no formato desejado
        if resultado:
            return f"Resultado: {resultado}"
        else:
            return "Resultado: Nenhum elemento em comum entre as listas."
    
    # Renderiza o template apenas no GET
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)