<template>
  <div class="chart-container">
    <div class="filters">
      <button @click="toggleFilter('pourvues')" :class="{ active: activeFilters.includes('pourvues') }">
        Offres pourvues
      </button>
      <button @click="toggleFilter('nonPourvues')" :class="{ active: activeFilters.includes('nonPourvues') }">
        Offres non pourvues
      </button>
      <button @click="toggleDataSet">
        {{
          isYearlyData
            ? "Afficher données mensuelles"
            : "Afficher données annuelles"
        }}
      </button>
    </div>

    <ClientOnly>
      <apexchart v-if="chartData" width="100%" height="350" type="bar" :options="chartOptions" :series="currentSeries">
      </apexchart>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useChartData } from "~/composables/useChartData";
const activeFilters = ref(['pourvues', 'nonPourvues']);

const { chartData } = useChartData();

const isYearlyData = ref(true);

const currentSeries = computed(() => {
  const series = isYearlyData.value ? chartData.value.yearlySeries : chartData.value.monthlySeries;
  return series.filter(s =>
    (s.name === "Offres pourvues" && activeFilters.value.includes('pourvues')) ||
    (s.name === "Offres non pourvues" && activeFilters.value.includes('nonPourvues'))
  );
});

const chartOptions = computed(() => ({
  chart: {
    id: "vuechart-example",
    type: "bar",
  },
  colors: ["#4CAF50", "#FF5722"], // Vert pour pourvues, Rouge pour non pourvues
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "40%",
      endingShape: "rounded",
      distributed: false,
      dataLabels: {
        position: "top",
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return val;
    },
    offsetY: -20,
    style: {
      fontSize: "12px",
      colors: ["#304758"]
    }
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"]
  },
  xaxis: {
    categories: isYearlyData.value
      ? chartData.value.monthsFr
      : Array.from({ length: 30 }, (_, i) => i + 1),
  },
  yaxis: {
    title: {
      text: "Nombre d'offres"
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " offres"
      }
    }
  },
  title: {
    text: isYearlyData.value ? "Offres pourvues vs non pourvues (Annuel)" : "Offres pourvues vs non pourvues (Mensuel)",
    align: "center",
  },
  legend: {
    position: "bottom"
  }
}));
function toggleDataSet() {
  isYearlyData.value = !isYearlyData.value;
}
function toggleFilter(filter) {
  const index = activeFilters.value.indexOf(filter);
  if (index > -1) {
    activeFilters.value.splice(index, 1);
  } else {
    activeFilters.value.push(filter);
  }
}

</script>
<style lang="scss">
.chart-container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}
</style>
