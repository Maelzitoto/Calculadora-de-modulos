from flask import Flask, request, render_template

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    resultado = None
    if request.method == "POST":
        # Recupera os valores dos inputs com o mesmo nome "lista" e "nome_lista"
        nomes = request.form.getlist("nome_lista")
        listas = request.form.getlist("lista")
        
        conjuntos = []
        for item in listas:
            # Usa vírgula como delimitador e remove espaços extras
            elementos = {elem.strip() for elem in item.split(",") if elem.strip()}
            if elementos:
                conjuntos.append(elementos)
        
        if conjuntos:
            intersecao = set.intersection(*conjuntos)
            if intersecao:
                resultado = ", ".join(sorted(intersecao))
            else:
                resultado = "Nenhum elemento em comum entre as listas."
        
    return render_template("index.html", resultado=resultado)

if __name__ == "__main__":
    app.run(debug=True)