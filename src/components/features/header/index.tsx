import { Link } from 'react-router-dom';

import * as styles from './index.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link className={styles.link} to="/">
          Home
        </Link>
        <Link className={styles.link} to="/profile">
          Profile
        </Link>
      </nav>
    </header>
  );
};
