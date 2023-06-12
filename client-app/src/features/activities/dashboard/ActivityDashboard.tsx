import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityFilters from "./ActivityFilters";

export default observer (function ActivityDashboard() 
{
    const { activityStore } = useStore();
    const {loadActivities, activityRegistry} = activityStore;

    useEffect(() =>         { 
        if (activityRegistry.size <= 1) loadActivities();
    }, [activityRegistry.size, loadActivities])
    
    if (activityStore.loadingInitial) return <LoadingComponent content='Loading app'/>

    return (
        <Grid width='25%'>
            {/* First column */}
            <Grid.Column width='11'>
                <ActivityList />
            </Grid.Column>
            {/* Second column */}
            <Grid.Column width='5'>
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    )
})