import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";

const App = () => {
	const [activities, setActivities] = useState<Activity[]>([]);
	const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
	const [editMode, setEditMode] = useState(false);

	useEffect(() => {
		agent.Activities.list().then((response) => {
			let activities: Activity[] = [];
			response.forEach((activity) => {
				activity.date = activity.date.split("T")[0];
				activities.push(activity);
			});
			setActivities(activities);
		});
	}, []);

	const handleSelectActivity = (id: string) => setSelectedActivity(activities.find((x) => x.id === id));

	const handleCancelSelectActivity = () => setSelectedActivity(undefined);

	// Gets an options ID
	// If it has an ID then it calls the handleSelectActivity function (This means there is a selected activity)
	// If it has no ID then it alls the handleCancelSelectActivity (This means there is no selected activity)
	const handleFormOpen = (id?: string) => {
		id ? handleSelectActivity(id) : handleCancelSelectActivity();
		setEditMode(true);
	};

	const handleFormClose = () => setEditMode(false);

	const handleCreateOrEditActivity = (activity: Activity) => {
		activity.id
			? setActivities([...activities.filter((x) => x.id !== activity.id), activity])
			: setActivities([...activities, { ...activity, id: uuid() }]);
		setEditMode(false);
		setSelectedActivity(activity);
	};

	const handleDeleteActivity = (id: string) => setActivities([...activities.filter((x) => x.id !== id)]);
	return (
		<>
			<NavBar openForm={handleFormOpen} />
			<Container style={{ marginTop: "7em" }}>
				<ActivityDashboard
					activities={activities}
					selectedActivity={selectedActivity}
					selectActivity={handleSelectActivity}
					cancelSelectActivity={handleCancelSelectActivity}
					editMode={editMode}
					openForm={handleFormOpen}
					closeForm={handleFormClose}
					createOrEdit={handleCreateOrEditActivity}
					deleteActivity={handleDeleteActivity}
				/>
			</Container>
		</>
	);
};

export default App;
