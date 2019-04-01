import React from 'react';

import './card.scss';

export default function Card({ card, displayed, onSelect }) {
    return (
        <div className={`Card ${displayed ? 'displayed' : ''}`}>
            <div className="Card-inner">
                <button type="button" onClick={onSelect} className="Card-front" />
                <div className="Card-back" style={{ backgroundPositionY: card * 100 }} />
            </div>
        </div>
    );
}
