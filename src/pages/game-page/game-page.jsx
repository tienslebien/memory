import React, { useState } from 'react';

import Card from 'components/card';
import Timer from 'components/timer';
import { getNewGame } from 'services/cards';

import './game-page.scss';

const gameDuration = 120;
export default function GamePage() {
    // Initialisation du jeu.
    // On le sauve dans le state pour garder le même jeu
    // à chaque rechargement du composant
    const [cards] = useState(getNewGame());

    // l'index des cartes que l'on est en train de retourner
    const [selected, setSelected] = useState([]);
    // l'index des cartes déjà trouvées.
    const [cardFound, setCardFound] = useState([]);

    const gameOver = () => {
        // eslint-disable-next-line no-alert
        window.alert('Vous avez perduuuuuuuu !');
    };

    const gameDone = () => {
        // eslint-disable-next-line no-alert
        window.alert('Vous avez gagnééééééééé !');
    };

    // Pour savoir si on doit afficher l'image ou le dos de la carte
    // On regarde si l'index de la carte fait partie des cartes en cours de selection
    // et des cartes trouvées
    const displayCard = cardIndex => [...selected, ...cardFound].includes(cardIndex);

    const onSelect = cardIndex => () => {
        if (!selected.length) {
            // On retourne notre première carte
            setSelected([cardIndex]);
        } else if (selected.length === 1) {
            // On retourne notre deuxième carte
            const [selectedIndex] = selected;
            if (cards[cardIndex] === cards[selectedIndex]) {
                // On a retourné la même carte \o/
                setCardFound([...cardFound, selectedIndex, cardIndex]);
                setSelected([]);
            } else {
                // On affiche la carte
                setSelected([selectedIndex, cardIndex]);
                // On retourne les cartes un peu après
                setTimeout(() => setSelected([]), 2000);
            }
        }
    };

    if (cardFound.length === cards.length) {
        gameDone();
    }

    return (
        <div className="Game">
            {cards.map((card, i) => (
                <Card
                    card={card}
                    // card index is our key in this particular use case
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    displayed={displayCard(i)}
                    onSelect={onSelect(i)}
                />
            ))}

            <Timer duration={gameDuration} onTimeUp={gameOver} />
        </div>
    );
}
