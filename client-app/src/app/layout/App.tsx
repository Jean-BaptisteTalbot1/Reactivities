import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() 
{
  const { activityStore } = useStore();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { 
    activityStore.loadActivities();
  }, [activityStore])

  // Checks if there is an existing activity (if the passed activity has an id, it exists, else it is created)
  // And after that, the edit mode is disabled and the new activity is selected
  function handleCreateOrEditActivity(activity: Activity)
  {
      setSubmitting(true);

      if (activity.id)
      {
        agent.Activities.update(activity).then(() => { 
          setActivities([...activities.filter(x => x.id !== activity.id), activity]) 
          activityStore.selectActivity(activity.id);
          setSubmitting(false);
        })
      } 
      else 
      {
        activity.id = uuid();
        agent.Activities.create(activity).then(() => { 
          setActivities([...activities, activity]); 
          activityStore.selectActivity(activity.id);
          setSubmitting(false);
        })
      }
  }
 
  function handleDeleteActivity(id: string)
  {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)])
      setSubmitting(false);
    })
  }

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading app'/>
  
  // Empty tags (<> </> are the same as <Fragment></Fragment>)
  return (
    <> 
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activityStore.activities}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );

}
// Can you describe me the previous code please ?
export default observer(App);
