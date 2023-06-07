import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer (function ActivityDashboard() 
{
    const { activityStore } = useStore();
    
    useEffect(() =>         { 
        activityStore.loadActivities();
    }, [activityStore])
    
    if (activityStore.loadingInitial) return <LoadingComponent content='Loading app'/>

    return (
        <Grid width='25%'>
            {/* First column */}
            <Grid.Column width='11'>
                <ActivityList />
            </Grid.Column>
            {/* Second column */}
            <Grid.Column width='5'>
                <h2>Activities filter</h2>
            </Grid.Column>
        </Grid>
    )
})