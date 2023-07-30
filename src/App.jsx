import Boards from './components/Board/Board';
import Header from './components/Header';
import ContextProvider from './components/Context/ContextProvider';
import './App.scss';

function App() {
  return (
    <ContextProvider>
      <Header />
      <Boards />
    </ContextProvider>
  );
}

export default App;
