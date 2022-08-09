<template>
    <div class="wellness-plan-wrapper">
        <h1 class="title">2021 Wellness Plan</h1>
        <div class="main-block">
            <div class="main-block__header">
                <p class="title">Your progress <span class="steps">3 steps to complete</span></p>
                <button class="btn-hide" @click="isShowActivities = !isShowActivities">hide</button>
            </div>
            <transition name="slide">
                <div v-if="isShowActivities" class="main-block__content">
                    <div class="chart-block">
                        <ApexChart type="donut" :options="options" :series="series" />
                    </div>
                    <div class="activities-block">
                        <MonthCalendar :data="allActivities" />
                        <div v-for="(item, index) in fetchActivities" :key="index">
                            <div class="activities-item" v-for="(activity, i) in item.activities" :key="i">
                                <p v-if="!activity.isEdit" class="activities-item__name">{{activity.name}}</p>
                                <input v-if="activity.isEdit" v-model="activityName" @keyup.enter="hideInput(activity)" />
                                <div class="flex-center" style="width: 30%; justify-content: end">
                                    <div class="flex-center state-info">
                                        <img :src="require('@/assets/' + getActivitySate(activity.state) + '.svg')" class="state-icon" :alt="getActivitySate(activity.state)" width="24" />
                                        <span :class="getActivitySate(activity.state)">{{getActivitySate(activity.state)}}</span>
                                    </div>
                                    <div class="actions">
                                        <button @click="activity.isOpenActions = !activity.isOpenActions" class="btn-actions">
                                            <img src="@/assets/three-dots.svg" alt="dots icon" width="24" />
                                        </button>
                                        <div v-if="activity.isOpenActions" class="actions-list">
                                            <ul>
                                                <li @click="editActivity(activity)">Edit</li>
                                                <li @click="remove(activity)">Delete</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
// components
import ApexChart from '@/components/ApexChart.vue';
import MonthCalendar from '@/components/MonthCalendar.vue';

export default {
    name: "ActivitiesList",
    components: { ApexChart, MonthCalendar },
    data() {
        return {
            isShowActivities: true,
            isOpenActions: false,
            options: {
                legend: {
                    show: false
                },
                colors: ['#66B25C', '#13599E', '#A3C8ED'],
                title: {
                    text: 'Completed appointments',
                    align: 'center',
                    style: {
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#B1B1B1' 
                    },
                    margin: 25
                },
                tooltip: {
                    enabled: false,
                },
                stroke: {
                    width: 0
                },
                dataLabels: {
                    enabled: false 
                },
                plotOptions: {
                    pie: {
                        donut: {
                            size: '75%',
                        }
                    }
                }
            },
            series: []
        }
    },
    computed: {
        ...mapGetters({
            fetchActivities: 'activities/fetchActivities'
        }),
        ...mapState({
            allActivities: state => state.activities.allActivities,
            completedActivities: state => state.activities.completedActivities,
            bookedActivities: state => state.activities.bookedActivities,
            bookNowActivities: state => state.activities.bookNowActivities,
            selectedActivity: state => state.activities.selectedActivity
        }),
        activityName: {
            get() {
                return this?.selectedActivity?.name
            },
            set(value) {
                this.setActivityName(value)
            }
        }
    },
    created() {
        this.fetchActivities
        this.setActivities()
        this.getChartData()
    },
    methods: {
        ...mapMutations({
            setActivities: 'activities/setActivities',
            removeActivity: 'activities/removeActivity',
            setSelectedActivity: 'activities/setSelectedActivity',
            setActivityName: 'activities/setActivityName'
        }),
        getChartData() {
            this.setActivities()
            this.series = [this.completedActivities, this.bookedActivities, this.bookNowActivities]
        },
        getActivitySate(value) {
            switch(value) {
                case 0: {
                    return 'book-now'    
                }
                case 1: {
                    return 'booked'    
                }
                case 2: {
                    return 'completed'    
                }
            }
        },
        remove(activity) {
            this.removeActivity(activity)
            this.getChartData()
        },
        editActivity(activity) {
            this.setSelectedActivity(activity)
        },  
        hideInput(item) {
            item.isEdit = false
        }
    }
}
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.text-center {
    text-align: center;
}
.flex-center {
    display: flex;
    align-items: center;
}
.wellness-plan-wrapper {
    padding: 10px;
}
.wellness-plan-wrapper .title {
    margin-bottom: 20px;
    color: #1F2F48;
}

.main-block {
    border: 1px solid #e9e9e9;
    border-radius: 12px;
    padding: 25px;
}
.main-block__header {
    display: flex;
    justify-content: space-between;
    position: relative;
}
.main-block__header .title {
    font-size: 20px;
    font-weight: 600;
    color: #2F2F4F;
    margin-bottom: 0;
}
.main-block__header .title .steps {
    font-size: 15px;
    color: #cac8c8;
}
.main-block__content {
    display: flex;
    margin-top: 30px;
}

button {
    background-color: transparent;
    border: none;
    cursor: pointer;
}

.btn-hide {
    font-size: 16px;
    color: #B0B0B0;
    font-weight: 600;
    text-decoration: none;
}
.btn-hide::after {
    content: '';
    position: absolute;
    width: 35px;
    height: 3px;
    background-color: #B0B0B0;
    bottom: 0;
    right: -1px;
}

.chart-block {
    width: 20%;
    margin: 0 20px;
}
.activities-block {
    width: 80%;
    margin: 0 20px;
}

.activities-item {
    display: flex;
    justify-content: space-between;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 25px 16px;
    margin: 10px 0;
}
.activities-item {
    height: 80px;
    align-items: center;
}

.activities-item__name {
    font-weight: 600;
    color: gray;
}
.state-info {
    width: 160px;
}
.state-info span {
    font-weight: 600;
}
.state-info .completed {
    color: #66B25C;
}
.state-info .booked {
    color: #13599E;
}
.state-info .book-now {
    color: #A3C8ED;
}
.state-icon {
    margin-right: 8px;
}

.slide-enter-active {
   transition-duration: 0.2s;
}
.slide-leave-active {
   transition-duration: 0.2s;
}
.slide-enter-to, .slide-leave {
   max-height: 400px;
   overflow: hidden;
}
.slide-enter, .slide-leave-to {
   overflow: hidden;
   max-height: 0;
}

.actions {
    position: relative;
}
.actions-list {
    position: absolute;
    right: 0;
    background-color: #fff;
    box-shadow: 0 0 5px rgb(40 78 102 / 15%);
    width: 200px;
    text-align: center;
    padding: 14px 0;
}
.actions-list ul {
    list-style: none;
}
.actions-list ul li {
    font-size: 16px;
    font-weight: 600;
    cursor: pointer
}
.actions-list ul li:first-child {
    margin-bottom: 12px;
}
.actions-list ul li:last-child {
    color: red;
}

input {
    max-width: 250px;
    width: 100%;
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>
