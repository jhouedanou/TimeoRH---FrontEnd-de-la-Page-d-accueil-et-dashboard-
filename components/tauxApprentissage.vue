<template>
  <div id="chart">
    <ClientOnly>
      <component
        :is="chartComponent"
        type="donut"
        :options="chartOptions"
        :series="series"
      />
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent, computed } from "vue";
import { useRecruteursJson } from "~/composables/useRecruteurs";

const props = defineProps({
  recruteurId: {
    type: Number,
    required: true,
  },
});
//console.log("recruteurID : ", props.recruteurId);
const chartComponent = defineAsyncComponent(() => import("vue3-apexcharts"));
const { data: recruteurs } = useRecruteursJson();
const series = computed(() => {
  const recruteursArray = recruteurs.value.recruteurs || [];
  const recruteur = recruteursArray.find(
    (r) => r.recruteur_id === props.recruteurId
  );
  const complete = recruteur ? recruteur.apprentissageComplete : 0;
  return [complete, 100 - complete];
});

const chartOptions = ref({
  chart: {
    type: "donut",
  },
  colors: ["#3B82F6", "#F59E0B"],
  labels: ["Complété", "Restant"],
  dataLabels: {
    enabled: true,
    formatter: function (val, opts) {
      return opts.w.config.series[opts.seriesIndex] + "%";
    },
  },
  plotOptions: {
    pie: {
      donut: {
        size: "70%",
        labels: {
          show: true,
          name: {
            show: true,
            offsetY: 20,
          },
          value: {
            show: true,
            fontSize: "24px",
            fontWeight: "bold",
            color: "#000000",
            offsetY: -20,
            formatter: function (val) {
              return val + "%";
            },
          },
          total: {
            show: false,
          },
        },
      },
    },
  },
  legend: {
    show: true,
    position: "bottom",
  },
  states: {
    normal: {
      filter: {
        type: "none",
      },
    },
    hover: {
      filter: {
        type: "none",
      },
    },
  },
});
</script>

<style scoped>
#chart :deep(.apexcharts-datalabel-label),
#chart :deep(.apexcharts-datalabel-value) {
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 20px 148.4px 108px 0;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 20px 60px 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
  font-family: Inter;
}
</style>
