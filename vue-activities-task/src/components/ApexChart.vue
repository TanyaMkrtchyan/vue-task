<template>
    <div>
        <apexchart :type="type" :options="options" :series="series"></apexchart>
    </div>
</template>
<script>
export default {
    name: "ApexChart",
    props: {
        type: {
            type: String,
            required: true
        },
        options: {
            type: Object,
            required: true
        },
        series: {
            type: Array,
            required: true
        }
    }
}
</script>