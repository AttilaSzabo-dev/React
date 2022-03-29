import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';

function App() {

  const [tvEventInit, setTvEventInit] = useState();

  useEffect(() => {    async function getData() {
      const resp = await fetch("tv-event/init"); 
      setTvEventInit(await resp.json());
      
      //console.log(tvEventInit);
    };
    getData();
  }, []);

  return (
    <div>
      <Header/>
      <p>tv event init: {tvEventInit}</p>
    </div>
  );
}

export default App;
