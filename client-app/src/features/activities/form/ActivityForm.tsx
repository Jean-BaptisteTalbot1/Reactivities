import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

interface Props {
    createOrEdit: (activity: Activity) => void;
    submitting: boolean;
}

export default function ActivityForm({createOrEdit, submitting}: Props){

    const {activityStore} = useStore();
    const {selectedActivity, closeForm} = activityStore;

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    };

    const [activity, setActivity] = useState(initialState);

    function handlerSubmit(){
        createOrEdit(activity)
    }

    function handlerInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handlerSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handlerInputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handlerInputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handlerInputChange}/>
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handlerInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handlerInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handlerInputChange}/>
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}