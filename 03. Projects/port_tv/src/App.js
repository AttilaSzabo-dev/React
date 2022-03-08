import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [test, setTest] = useState(null);

  useEffect(() => {
    async function getData() {
      const resp = await fetch("https://szaboa-3.dev.port.hu/tv-event/init"); 
      setTest(await resp.json());
      
      console.log(test);
    };
    getData();
  }, []);

  return (
    <div>
      
    </div>
  );
}

export default App;
