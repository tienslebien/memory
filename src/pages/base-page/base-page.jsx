import React from 'react';
import { useRoutes, A } from 'hookrouter';

import GamePage from 'pages/game-page';
import HomePage from 'pages/home-page';
import NotFoundPage from 'pages/not-found-page';

import './base-page.scss';

const routes = {
    '/': () => <HomePage />,
    '/game': () => <GamePage />,
};

export default function BasePage() {
    const routeResult = useRoutes(routes) || <NotFoundPage />;

    return (
        <div className="App">
            <header>
                <A className="logo" href="/">
                    o&apos;Memory
                </A>
                <nav>
                    <A href="/game">Jouer!</A>
                </nav>
            </header>

            <section>{routeResult}</section>

            <footer>By Etienne Crombez</footer>
        </div>
    );
}
