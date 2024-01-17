import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { ChangeEvent, useState } from "react";

interface Props {
	closeForm: () => void;
	activity: Activity | undefined;
}

const ActivityForm = ({ closeForm, activity: selectedActivity }: Props) => {
	const initialState = selectedActivity ?? {
		id: "",
		title: "",
		category: "",
		description: "",
		date: "",
		city: "",
		venue: "",
	};

	const [activity, setActivity] = useState(initialState);

	const handleSubmit = () => console.log(activity);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setActivity({ ...activity, [name]: value });
	};

	return (
		<Segment clearing>
			<Form onSubmit={handleSubmit} autoComplete="off">
				<Form.Input placeholder="Title" value={activity.title} name={activity.title} onChange={handleInputChange} />
				<Form.TextArea placeholder="Description" />
				<Form.Input placeholder="Category" />
				<Form.Input placeholder="Date" />
				<Form.Input placeholder="City" />
				<Form.Input placeholder="Venue" />
				<Button floated="right" positive type="submit" content="Submit" />
				<Button onClick={closeForm} floated="right" type="button" content="Cancel" />
			</Form>
		</Segment>
	);
};

export default ActivityForm;
