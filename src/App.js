
import { Provider } from 'react-redux';
import Container from './components/Container';
import { store } from './redux/app/store';

function App() {
  return (
    <Provider store={store}>
      <Container/>
    </Provider>
  );
}

export default App;
