import React, { useState, useEffect } from 'react';
import { render } from "react-dom";

const useEventSource = (url) => {
    const [data, updateData] = useState(null);

    useEffect(() => {
        const source = new EventSource(url);

        source.onmessage = function logEvents(event) {      
            updateData(JSON.parse(event.data));     
        }
    }, [])

    return data;
}

function App() {
  const data = useEventSource('http://localhost:8081/stream-random-numbers/1');
  if (!data) {
    return <div />;
  }

  return <div>The random number {data.value}</div>;
}

render(<App />, document.getElementById("root"));

export default App;