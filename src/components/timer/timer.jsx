import React, { useState, useEffect } from 'react';

import './timer.scss';

export default function Timer({ duration, onTimeUp }) {
    const [time, setTime] = useState(0);
    useEffect(() => {
        // On a besoin d'une closure pour garder une copie de `time`
        // car la callback passé à useEffect n'est lancé qu'une seule fois
        // et capture la `time` à l'initialisation (0) et n'est plus mise à jour
        // il existe d'autres façons de faire avez-vous des idées ?
        const updateTime = () => {
            let scopedTime = 0;
            return () => {
                scopedTime += 1;
                setTime(scopedTime);
            };
        };
        // Toutes les secondes, on incrémente time (s)
        const interval = setInterval(updateTime(), 1000);

        // ne pas oublier la callback pour éviter les fuites de mémoire.
        return () => clearInterval(interval);
    }, []);

    if (time === duration) {
        onTimeUp();
    }

    const percent = (100 * time) / duration;
    let className;
    if (percent < 50) {
        className = 'ok';
    } else if (percent < 75) {
        className = 'warning';
    } else {
        className = 'danger';
    }

    return (
        <progress className={`Timer ${className}`} max={duration} value={time}>
            {`${time} / ${duration}`}
        </progress>
    );
}
