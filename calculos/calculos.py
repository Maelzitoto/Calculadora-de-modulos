def calcular_intersecao(conjuntos):
    if not conjuntos:
        return "Nenhum elemento em comum entre as listas."
    
    intersecao = set.intersection(*conjuntos)
    if intersecao:
        resultado = ", ".join(sorted(intersecao))
    else:
        resultado = "Nenhum elemento em comum entre as listas."
    
    return resultado

def calcular_uniao(conjuntos):
    if not conjuntos:
        return "Nenhum elemento em comum entre as listas."
    
    uniao = set.union(*conjuntos)
    resultado = ", ".join(sorted(uniao))
    return resultado