import './app.css'

import React from "react";
import Head from "./components/head/head";
import Body from "./components/body/body";

const App = () => {

    return (
        <main className='app'>
            <Head/>
            <Body/>
        </main>
    )
}

export default App