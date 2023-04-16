import Header from "./components/layout/Header";
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartContext from "./context/Cart-Context";
import { useContext } from 'react';

function App() {
  const {cartState, } = useContext(CartContext);
  return (
    <>
      {cartState && <Cart />}
      <Header />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
