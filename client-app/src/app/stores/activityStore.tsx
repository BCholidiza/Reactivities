import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
	activities: Activity[] = [];
	selectedActivity: Activity | undefined = undefined;
	editMode = false;
	loading = false;
	loadingInitial = false;

	constructor() {
		makeAutoObservable(this);
	}

	loadActivities = async () => {
		this.loadingInitial = true;

		try {
			const activities = await agent.Activities.list();
			this.setLoadingInitial(true);

			activities.forEach((activity) => {
				activity.date = activity.date.split("T")[0];
				this.activities.push(activity);
			});
			this.setLoadingInitial(false);
		} catch (error) {
			console.log(error);
			this.setLoadingInitial(false);
		}
	};

	setLoadingInitial = (state: boolean) => {
		this.loadingInitial = state;
	};

	selectActivity = (id: string) => {
		this.selectedActivity = this.activities.find((a) => a.id === id);
	};

	cancelSelectedActivity = () => {
		this.selectedActivity = undefined;
	};

	openForm = (id?: string) => {
		id ? this.selectActivity(id) : this.cancelSelectedActivity();
		this.editMode = true;
	};

	closeForm = () => {
		this.editMode = false;
	};

	createActivity = async (activity: Activity) => {
		this.setLoading(true);
		activity.id = uuid();

		try {
			await agent.Activities.create(activity);
			this.setActivities(activity);
			this.selectActivity(activity.id);
			this.editMode = false;
			this.setLoading(false);
		} catch (error) {
			console.log(error);
			this.setLoading(false);
		}
	};

	setActivities = (activity: Activity) => (this.activities = [...this.activities, activity]);

	setEditMode = (editmode: boolean) => (this.editMode = editmode);

	updateActivity = async (activity: Activity) => {
		this.setLoading(true);

		try {
			await agent.Activities.update(activity);
			this.activities = [...this.activities.filter((a) => a.id !== activity.id), activity];
			this.selectActivity(activity.id);
			this.setLoading(false);
			this.setEditMode(false);
		} catch (error) {
			console.log(error);
			this.setLoading(false);
		}
	};

	setLoading = (state: boolean) => (this.loading = state);
}

// Google runInAction
// check MobX strict mode
