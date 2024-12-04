import './App.css';
import Weather from './components/Weather.jsx';
import logo from '/logo.jpg';

function App() {
  return (
    <div className="app">
      <img src={logo} alt="Logo" className="logo" />
      <div className="container">
        <Weather/>
      </div>

    </div>
  );
}
export default App;
