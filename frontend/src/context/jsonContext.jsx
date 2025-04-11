import { createContext, useState, useEffect } from "react";

export const JsonContext=createContext()


const JsonProvider=({children})=>{
    const [jsonData, setJsonData] = useState(null);

    useEffect(() => {
        fetch("https://affnnx.github.io/public-media/media.json")
          .then((response) => response.json())
          .then((json) => setJsonData(json))
          .catch((error) => console.error("Error fetching data:", error));
      }, []);

    
    return <JsonContext.Provider value={{jsonData}}>
        {children}
    </JsonContext.Provider>
}

export default JsonProvider;