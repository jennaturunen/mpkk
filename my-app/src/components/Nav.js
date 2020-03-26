import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {checkToken} from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';

const Nav = ({history}) => {
  const [user, setUser] = useContext(MediaContext);
  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await checkToken(localStorage.getItem('token'));
        console.log(userData);
        setUser(userData);
      } catch (e) {
        // Send to login-page
        history.push('/home');
      }
    };

    checkUser();
  }, [history, setUser]);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        {user === null ?
          <li>
            <Link to="/">Login</Link>
          </li> :
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </>
        }
      </ul>
    </nav>
  );
};

Nav.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Nav);
