export const activities = {
    namespaced: true,
    state: {
        allActivities: [
            { month: 'Jan' },
            {
                month: 'Feb',
                activities: [
                    {
                        id: 0,
                        name: 'NAD',
                        state: 1,
                        isOpenActions: false,
                        isEdit: false
                    }
                ]
            },
            { month: 'Mar' },
            {
                month: 'Apr',
                activities: [
                    {
                        id: 0,
                        name: 'NAD',
                        state: 0,
                        isOpenActions: false,
                        isEdit: false
                    },
                ]
            },
            { month: 'May' },
            {
                month: 'Jun',
                activities: [
                    {
                        id: 0,
                        name: 'Hormone replacement therapy',
                        state: 2,
                        isOpenActions: false,
                        isEdit: false
                    },
                    {
                        id: 1,
                        name: 'Ozone therapy',
                        state: 2,
                        isOpenActions: false,
                        isEdit: false
                    },
                    {
                        id: 2,
                        name: 'NAD',
                        state: 2,
                        isOpenActions: false,
                        isEdit: false
                    },
                    {
                        id: 3,
                        name: 'NAD',
                        state: 2,
                        isOpenActions: false,
                        isEdit: false
                    }
                ]
            },
            { month: 'Jul' },
            { month: 'Aug' },
            { month: 'Sep' },
            { month: 'Oct' },
            { month: 'Nov' },
            { month: 'Dec' }
        ],
        completedActivities: [],
        bookedActivities: [],
        bookNowActivities: [],
        selectedActivity: null
    },
    getters: {
        fetchActivities: state => state.allActivities
    },
    mutations: {
        setActivities(state) {
            let activitiesList = []

            state.allActivities.map(item => {
                if (item.activities) {
                    item.activities.map(activity => {
                        activitiesList.push(activity)
                    })
                }
            })

            state.bookNowActivities = activitiesList.filter(item => item.state === 0).length
            state.bookedActivities = activitiesList.filter(item => item.state === 1).length
            state.completedActivities = activitiesList.filter(item => item.state === 2).length
        },
        setSelectedActivity(state, activity) {
            state.selectedActivity = activity
            state.selectedActivity.isEdit = !state.selectedActivity.isEdit  
        },
        setActivityName(state, value) {
            state.selectedActivity.name = value
        },
        removeActivity(state, activity) {
            state.allActivities.map(item => {
                if (item.activities && item.activities.length) {
                    item.activities.forEach((element, i) => {
                        if (activity.id === element.id && activity.name === element.name && activity.state === element.state) {
                            item.activities.splice(i, 1)
                        }
                    })
                }
            })
        }
    },
    actions: {}
}