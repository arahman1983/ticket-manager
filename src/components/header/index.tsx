import styles from './header.module.css'
import logo from '../../logo.svg';

export default function AppHeader () {
  return (
    <header className="w-100 bg-dark">
      <div className={`container ${styles['App-header']}`}>
        <img src={logo} className={styles["App-logo"]} alt="logo" />
        <h4>Tickets Manager</h4>
      </div>
    </header>
  )
}