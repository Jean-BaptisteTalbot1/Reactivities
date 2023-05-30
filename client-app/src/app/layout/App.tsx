import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined> (undefined); // The pipe tells that the initial state could also be undefined
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities/GetActivities').then(response => {
      setActivities(response.data);
    })
  }, []) // To only toggle once the useEffect, we need to add dependency with the []

  function handlerSelectActivity(id: string){
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handlerCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handlerSelectActivity(id) : handlerCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }


  // Empty tags (<> </> are the same as <Fragment></Fragment>)
  return (
    <> 
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handlerSelectActivity}
          cancelSelectActivity={handlerCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
        />
      </Container>
    </>
 );

}
// Can you describe me the previous code please?
export default App;
