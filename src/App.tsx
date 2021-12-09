import styles from './App.module.css';
import { AppHeader } from './components';
import { TicketsList } from './views';

function App() {
  return (
    <div className={styles.App}>
      <AppHeader />
      <div className="container">
        <TicketsList/>
      </div>
    </div>
  );
}

export default App;
