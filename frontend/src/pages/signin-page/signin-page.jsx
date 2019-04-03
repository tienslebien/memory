import React, { useState } from 'react';
import { A } from 'hookrouter';

import { register, login } from 'services/user';

import './signin-page.scss';

export default function SigninPage({ onSignin, signup }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [color, setColor] = useState('');
    const submit = async () => {
        // TODO meilleur validation que juste les champs sont présent.
        const isFormValid = username && pasword && color;
        if (!isFormValid) {
            // TODO: retour d'erreur
            return;
        }
        const id = signup
            ? await register({ username, password, color })
            : await login({ username, password });
        onSignin(id);
    };

    return (
        <div className="SigninPage">
            <div className="field">
                <label htmlFor="username">joueur</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
            </div>

            <div className="field">
                <label htmlFor="password">mot de passe</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </div>

            {signup && (
                <div className="field">
                    <label htmlFor="color">couleur</label>
                    <input
                        id="color"
                        type="color"
                        value={color}
                        onChange={e => setColor(e.target.value)}
                        required
                    />
                </div>
            )}

            <button type="submit" onClick={submit}>
                S&apos;inscrire
            </button>

            {signup ? <A href="/signin">Se connecter</A> : <A href="/signup">S&apos;enregistrer</A>}
        </div>
    );
}
