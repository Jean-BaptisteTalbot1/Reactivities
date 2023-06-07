import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";

export default observer (function ActivityForm(){

    const {activityStore} = useStore();
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore;

    const {id} = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity])

    function handlerSubmit(){
        if (!activity.id){
            activity.id = uuid();
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        } else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }
    }

    function handlerInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

    if (loadingInitial) return <LoadingComponent content='Loading...'/>

    return (
        <Segment clearing>
            <Form onSubmit={handlerSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handlerInputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handlerInputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handlerInputChange}/>
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handlerInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handlerInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handlerInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})