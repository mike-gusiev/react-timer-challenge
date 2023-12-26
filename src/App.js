import './App.css';

import Timer from './components/Timer';

function App() {
  return (
    <div className="App">
      <Timer maxTime={6} />
    </div>
  );
}

export default App;
