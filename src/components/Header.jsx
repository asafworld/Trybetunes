import React from 'react';
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
      </header>
    );
  }
}

export default Header;
