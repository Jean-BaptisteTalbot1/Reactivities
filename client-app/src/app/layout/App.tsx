import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';

function App() {
  
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined> (undefined); // The pipe tells that the initial state could also be undefined
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(response => {

      // Creates a new activities array and parse the date before pushing the response to the used array (temporary solution)
      let activities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })

      setActivities(activities);
    })
  }, [])
  // To only toggle once the useEffect, we need to add dependency with the []

  function handleSelectActivity(id: string){
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  // Checks if there is an existing activity (if the passed activity has an id, it exists, else it is created)
  // And after that, the edit mode is disabled and the new activity is selected
  function handleCreateOrEditActivity(activity: Activity){
    activity.id 
    ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
    : setActivities([...activities, {...activity, id: uuid()}]); // The uuid() creates a new and unique Guid
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string)
  {
    setActivities([...activities.filter(x => x.id !== id)])
  }

  // Empty tags (<> </> are the same as <Fragment></Fragment>)
  return (
    <> 
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
 );

}
// Can you describe me the previous code please?
export default App;
