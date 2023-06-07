import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

// export default function ActivityDashboard(props : Props) { // Same as the next line but we need to use props.activities.map....
    export default observer (function ActivityDashboard() 
    {
        const { activityStore } = useStore();
        const { selectedActivity, editMode } = activityStore;                               
        
        useEffect(() => { 
          activityStore.loadActivities();
        }, [activityStore])
      
        if (activityStore.loadingInitial) return <LoadingComponent content='Loading app'/>

        return (
            <Grid width='25%'>
                <ActivityList />
                <Grid.Column width='6'>
                    {/* The && tells to execute only if the passed argument isn't null or undefined. Otherwise */}
                    {selectedActivity && !editMode && 
                    <ActivityDetails />}
                    {editMode &&
                    <ActivityForm />}
                </Grid.Column>
            </Grid>
        )
})