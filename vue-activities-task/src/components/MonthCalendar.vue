<template>
    <div class="activities-months">
        <div class="text-center" v-for="(item, index) in data" :key="index">
            <span class="month">{{item.month}}</span>
            <div v-for="(activity, i) in item.activities" :key="i">
                <div :class="'border ' + getState(activity.state)"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "MonthCalendar",
    props: {
        data: {
            type: Array,
            required: true
        }
    },
    methods: {
        getState(value) {
            switch (value) {
                case 0: {
                    return "book-now";
                }
                case 1: {
                    return "booked";
                }
                case 2: {
                    return "completed";
                }
            }
        },
    }
}
</script>
<style scoped>
.activities-months {
    display: flex;
    justify-content: space-between;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 25px 16px;
    margin: 10px 0;
}
.month {
    display: block;
    margin-bottom: 10px;
    font-weight: 600;
    text-align: center;
    color: #A9C3DB;
}
.border {
    margin-bottom: 6px;
}
.border::after {
    display: block;
    content: '';
    width: 60px;
    height: 5px;
    border-radius: 5px;
}
.completed::after {
    background-color: #66B25C;
}
.booked::after {
    background-color: #13599E;
}
.book-now::after {
    background-color: #A3C8ED;
}
</style>