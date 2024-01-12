//import React from 'react';
import { Activity } from '../../../app/models/activity';
import { Item, Segment } from 'semantic-ui-react';

interface Props {
    activities: Activity[];
}

const ActivityList = ({activities}: Props) => {
    return ( 
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}></Item>
                ))}
            </Item.Group>
        </Segment>
     );
}
 
export default ActivityList;