import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/Home/HomePage';

function App() 
{
  const location = useLocation();

  // Empty tags (<> </> are the same as <Fragment></Fragment>)
  return (
    <> 
      {location.pathname === '/' ? <HomePage/> : (
        <>
          <NavBar />
          <Container style={{marginTop: '7em'}}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );

}
// Can you describe me the previous code please ?
export default observer(App);
