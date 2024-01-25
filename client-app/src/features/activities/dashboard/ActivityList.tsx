//import React from 'react';
import { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import useStore from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

const ActivityList = () => {
	const { activityStore } = useStore();
	const { deleteActivity, activitiesByDate, loading } = activityStore;

	const [target, setTarget] = useState("");

	// use this function to ensure that the correct button is targetted for deletion
	// if this function is not there, all buttons show loader on deletion
	const handleActivityDelete = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
		setTarget(e.currentTarget.name);
		deleteActivity(id);
	};

	return (
		<Segment>
			<Item.Group divided>
				{activitiesByDate.map((activity) => (
					<Item key={activity.id}>
						<Item.Content>
							<Item.Header as="a">{activity.title}</Item.Header>
							<Item.Meta>{activity.date}</Item.Meta>
							<Item.Description>
								<div>{activity.description}</div>
								<div>
									{activity.city}, {activity.venue}
								</div>
							</Item.Description>
							<Item.Extra>
								<Button
									onClick={() => activityStore.selectActivity(activity.id)}
									floated="right"
									content="View"
									color="blue"
								/>
								<Button
									name={activity.id}
									onClick={(e) => handleActivityDelete(e, activity.id)}
									floated="right"
									content="Delete"
									color="red"
									loading={loading && target === activity.id}
								/>
								<Label basic content={activity.category} />
							</Item.Extra>
						</Item.Content>
					</Item>
				))}
			</Item.Group>
		</Segment>
	);
};

export default observer(ActivityList);
