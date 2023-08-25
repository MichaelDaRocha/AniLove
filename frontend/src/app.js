import './app.css'

import React from "react";
import Head from "./components/head/head";
import Body from "./components/body/body";

const App = () => {

    return (
        <main className='app'>
            <Head/>
            <Body className='fill flex'/>
        </main>
    )
}

export default App