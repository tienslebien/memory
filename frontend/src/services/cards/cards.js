export const cards = [...Array(18)].map((_, i) => i);
// => [0,1,...,17]
// Array(18) crée un tableau de longueur 18 mais sans les cases (magie du js :D)
// [...Array(18)] crée un tableau de 18 cases undefined
// .map((_,i) => i) affecte à chaque case son index dans le tableau

export function getNewGame(items = cards) {
    return [...items, ...items].sort(() => Math.random() - 0.5);
    // [...items] destructuring => copie les élément de items dans un nouveau tableau
    // [...items, ...items] => un tableau avec tous les éléments en double.
    // array.prototype.sort trie le tableau, elle prend en param une fonction
    // cette fonction reçoit deux éléments du tableau
    // si la fonction renvoie 0 les éléments sont considérés comme égaux
    // Si le nombre est négatif, le premier élément sera placé avant le second
    // Et inversement si le nombre est positif.
    // Math.random() renvoie un nombre aléatoire en 0 et 1
    // De cette façon les éléments seront triés de façon aléatoire.
}
