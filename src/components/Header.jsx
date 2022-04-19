import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.waitingForUser();
  }

  waitingForUser = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ user: user.name, loading: false });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <Loading /> : (
          <h2 data-testid="header-user-name">
            { user }
          </h2>) }
        <nav>
          <hr />
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <hr />
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <hr />
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          <hr />
        </nav>
      </header>
    );
  }
}

export default Header;
