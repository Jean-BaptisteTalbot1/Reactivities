import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data);
    })
  }, []) // To only toggle once the useEffect, we need to add dependency with the []

  return (
    <div className="App">
      <Header as='h2' icon='users' content='Reactivities'/>
      <List>
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>
            {activity.title}   
          </List.Item>
        ))}
      </List>
    </div>
 );

}
// Can you describe me the previous code please?
export default App;
