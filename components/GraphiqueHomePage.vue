<template>
  <div class="chart-container">
    <button @click="toggleDataSet">
      {{
        isYearlyData
          ? "Afficher données mensuelles"
          : "Afficher données annuelles"
      }}
    </button>
    <ClientOnly>
      <apexchart
        v-if="chartData"
        width="100%"
        height="350"
        type="bar"
        :options="chartOptions"
        :series="currentSeries"
      ></apexchart>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useChartData } from "~/composables/useChartData";

const { chartData } = useChartData();

const isYearlyData = ref(true);

const currentSeries = computed(() =>
  isYearlyData.value
    ? chartData.value.yearlySeries
    : chartData.value.monthlySeries
);

const chartOptions = computed(() => ({
  chart: {
    id: "vuechart-example",
    stacked: true,
  },
  colors: ["#012e61", "#dc9756"],
  plotOptions: {
    bar: {
      columnWidth: "72px",
      borderRadius: 10,
    },
  },
  xaxis: {
    categories: isYearlyData.value
      ? chartData.value.monthsFr
      : Array.from({ length: 30 }, (_, i) => i + 1),
  },
  title: {
    text: isYearlyData.value ? "Données annuelles" : "Données mensuelles",
    align: "center",
  },
}));

function toggleDataSet() {
  isYearlyData.value = !isYearlyData.value;
}
</script>
<style lang="scss">
.chart-container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}
</style>
