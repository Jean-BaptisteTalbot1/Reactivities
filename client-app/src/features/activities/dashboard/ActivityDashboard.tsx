import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined
    selectActivity: (id: string) => void; // Here we add function. So name: (param: paramType) => returningType
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
}

// export default function ActivityDashboard(props : Props) { // Same as the next line but we need to use props.activities.map....
    export default function ActivityDashboard({activities, selectedActivity, selectActivity, cancelSelectActivity, editMode, openForm, closeForm} : Props) {
        return (
            <Grid width='10'>
                <ActivityList activities={activities} selectActivity={selectActivity} />
                <Grid.Column width='6'>
                    {/* The && tells to execute only if the passed argument isn't null or undefined. Otherwise */}
                    {selectedActivity && !editMode && 
                    <ActivityDetails 
                        activity={selectedActivity} 
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm}
                    />}
                    {editMode &&
                    <ActivityForm
                        closeForm={closeForm}
                        activity={selectedActivity}
                    />}
                </Grid.Column>
            </Grid>
        )
}