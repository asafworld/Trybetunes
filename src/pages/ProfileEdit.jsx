import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
      name: '',
      email: '',
      description: '',
      image: '',
      loading: false,
      disable: true,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.letUpdate = this.letUpdate.bind(this);
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const info = await getUser();
    console.log(info);
    this.setState({ userInfo: info,
      loading: false,
      name: info.name,
      email: info.email,
      description: info.description,
      image: info.image });
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.ableTheButton());
  }

  letUpdate = async () => {
    const { history } = this.props;
    const { name, email, image, description } = this.state;
    this.setState({ loading: true });
    await updateUser({ name, email, image, description });
    history.push('/profile');
  }

  ableTheButton() {
    const { name, email, image, description } = this.state;
    if (name !== ''
      && email !== ''
      && image !== ''
      && description !== '') {
      this.setState({ disable: false });
    }
  }

  render() {
    const { userInfo, name, email, image, description, loading, disable } = this.state;
    console.log(userInfo);
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading ? <Loading /> : (
          <form>
            <label htmlFor="edit-input-image">
              Imagem:
              <input
                name="image"
                onChange={ this.onInputChange }
                type="text"
                data-testid="edit-input-image"
                value={ image }
                id="edit-input-image"
              />
            </label>
            <label htmlFor="edit-input-name">
              Nome:
              <input
                name="name"
                onChange={ this.onInputChange }
                type="text"
                data-testid="edit-input-name"
                value={ name }
                id="edit-input-name"
              />
            </label>
            <label htmlFor="edit-input-email">
              E-mail:
              <input
                name="email"
                onChange={ this.onInputChange }
                type="email"
                data-testid="edit-input-email"
                value={ email }
                id="edit-input-email"
                accept="test@test.com"
              />
            </label>
            <label htmlFor="edit-input-description">
              Descrição:
              <input
                name="description"
                onChange={ this.onInputChange }
                type="text"
                data-testid="edit-input-description"
                value={ description }
                id="edit-input-description"
              />
            </label>
            <button
              type="button"
              data-testid="edit-button-save"
              onClick={ this.letUpdate }
              disabled={ disable }
            >
              Editar perfil
            </button>
          </form>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
