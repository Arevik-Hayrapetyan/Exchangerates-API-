import React from "react";
import Convert from "../Convert/Convert";
import Latest from "../Latest/Latest";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";

function App() {
    return (
        <ChakraProvider>
            <div className="App">
                <Convert />
                <Latest />
            </div>
        </ChakraProvider>
    );
}

export default App;
