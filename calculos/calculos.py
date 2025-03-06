def calcular_intersecao(conjuntos):
    if conjuntos:
            intersecao = set.intersection(*conjuntos)
            if intersecao:
                resultado = ", ".join(sorted(intersecao))
            else:
                resultado = "Nenhum elemento em comum entre as listas."
                
    return resultado

def calcular_uniao(conjuntos):
    if conjuntos:
        uniao = set.union(*conjuntos)
        resultado = ", ".join(sorted(uniao))
    else:
        resultado = "Nenhum elemento em comum entre as listas."
    return resultado

