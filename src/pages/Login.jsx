import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      disabled: true,
      loading: false,
    };

    this.inputChange = this.inputChange.bind(this);
    this.buttonAble = this.buttonAble.bind(this);
  }

   getTheUser = async () => {
     const { user } = this.state;
     const { history } = this.props;
     this.setState({ loading: true });
     console.log('loading');
     await createUser({ name: user });
     history.push('/search');
   }

   buttonAble() {
     const { user } = this.state;
     const min = 2;
     if (user.length >= min) {
       this.setState({ disabled: false });
     }
   }

   inputChange({ target }) {
     const { value } = target;
     this.setState({ user: value }, this.buttonAble());
   }

   render() {
     const { user, disabled, loading } = this.state;
     return (
       <div data-testid="page-login">
         { loading ? <Loading /> : (
           <form>
             <label htmlFor="login-name-input">
               <input
                 type="text"
                 data-testid="login-name-input"
                 value={ user }
                 id="login-name-input"
                 onChange={ this.inputChange }
                 placeholder="Username"
               />
             </label>
             <button
               type="button"
               data-testid="login-submit-button"
               id="login-submit-button"
               disabled={ disabled }
               onClick={ this.getTheUser }
             >
               Entrar
             </button>
           </form>)}
       </div>
     );
   }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
