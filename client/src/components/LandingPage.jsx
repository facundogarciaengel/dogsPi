import React from 'react';
import { Link } from 'react-router-dom';

export default function LangingPage() {
    return (
        <div>
            <h1>¡Welcome to Henry Dogs!</h1>
            <Link to='/home'>
                <button>Welcome</button>
            </Link>
        </div>
    )
}
