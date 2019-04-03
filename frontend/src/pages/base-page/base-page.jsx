import React, { useState } from 'react';
import { useRoutes, A, navigate } from 'hookrouter';

import GamePage from 'pages/game-page';
import HomePage from 'pages/home-page';
import NotFoundPage from 'pages/not-found-page';
import SigninPage from 'pages/signin-page';

import './base-page.scss';


export default function BasePage() {
    const [userId, setUserId] = useState(null);

    const onSignin = (id) => {
        setUserId(id);
        navigate('/');
    };
    const routes = {
        '/': () => () => <HomePage />,
        '/game': () => connected => (connected ? <GamePage /> : navigate('/signin')),
        '/signin': () => () => <SigninPage onSignin={onSignin} />,
        '/signup': () => () => <SigninPage onSignin={onSignin} signup />,
    };

    const routeResult = useRoutes(routes)(userId) || <NotFoundPage />;

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
