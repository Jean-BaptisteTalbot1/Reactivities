import { Grid } from "semantic-ui-react";
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
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

// export default function ActivityDashboard(props : Props) { // Same as the next line but we need to use props.activities.map....
    export default function ActivityDashboard({activities, 
                                                selectedActivity, 
                                                    selectActivity, 
                                                        cancelSelectActivity, 
                                                            editMode, 
                                                                openForm, 
                                                                    closeForm,
                                                                        createOrEdit,
                                                                            deleteActivity,
                                                                                submitting} : Props) {
        return (
            <Grid width='25%'>
                <ActivityList activities={activities} 
                    selectActivity={selectActivity} 
                    deleteActivity={deleteActivity}
                    submitting={submitting}
                />
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
                        createOrEdit={createOrEdit}
                        submitting={submitting}
                    />}
                </Grid.Column>
            </Grid>
        )
}