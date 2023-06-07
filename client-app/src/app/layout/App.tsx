import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

function App() 
{
  // Empty tags (<> </> are the same as <Fragment></Fragment>)
  return (
    <> 
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <Outlet />
      </Container>
    </>
  );

}
// Can you describe me the previous code please ?
export default observer(App);
