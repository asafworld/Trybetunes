import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
      loading: false,
    };
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const info = await getUser();
    console.log(info);
    this.setState({ userInfo: info, loading: false });
  }

  render() {
    const { loading, userInfo } = this.state;
    const { name, email, image, description } = userInfo;
    return (
      <div data-testid="page-profile">
        <h1>Profile</h1>
        <Header />
        { loading ? <Loading /> : (
          <section>
            <div>
              <img
                src={ image }
                alt={ `${name} userphoto` }
                data-testid="profile-image"
              />
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
            <div>
              <h2>Nome:</h2>
              <h2>{ name }</h2>
            </div>
            <div>
              <h4>E-mail:</h4>
              <h4>{ email }</h4>
            </div>
            <div>
              <h4>Descrição:</h4>
              <p>{ description }</p>
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default Profile;
