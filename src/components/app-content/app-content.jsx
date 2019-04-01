import React from 'react';

import Game from 'components/game';
import { getNewGame } from 'services/cards';

import './app-content.scss';

export default function AppContent() {
    const game = getNewGame();
    return (
        <>
            <h1>Dévoilez toutes les cartes dans un temps record !</h1>
            <Game cards={game} />
        </>
    );
}
