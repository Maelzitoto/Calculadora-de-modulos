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

def calcular_lei_de_morgan(conjuntos, conjunto_universo):
    """
    Calcula a Lei de Morgan para dois conjuntos:
    (A ∪ B)c = Ac ∩ Bc
    """
    if len(conjuntos) != 2:
        return "Erro: A Lei de Morgan só pode ser aplicada a exatamente dois conjuntos."

    A, B = conjuntos
    U = conjunto_universo

    # Passo 1: Calcular a união de A e B
    uniao_AB = A.union(B)

    # Passo 2: Calcular o complemento da união (A ∪ B)c = U - (A ∪ B)
    complemento_uniao = U - uniao_AB

    # Passo 3: Calcular os complementos individuais Ac = U - A e Bc = U - B
    complemento_A = U - A
    complemento_B = U - B

    # Passo 4: Calcular a interseção dos complementos Ac ∩ Bc
    intersecao_complementos = complemento_A.intersection(complemento_B)

    # Passo 5: Comparar os resultados
    if complemento_uniao == intersecao_complementos:
        return f"Lei de Morgan válida: (A ∪ B)c = {complemento_uniao}, Ac ∩ Bc = {intersecao_complementos}"
    else:
        return "Erro: A Lei de Morgan não foi validada."