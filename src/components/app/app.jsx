import React from 'react';

import AppContent from 'components/app-content';

import './app.scss';

export default function App() {
    return (
        <div className="App">
            <header>
                <span className="logo">o&apos;Memory</span>
            </header>

            <section>
                <AppContent />
            </section>

            <footer>By Etienne Crombez</footer>
        </div>
    );
}
