<template>
  <div>
    <h2>Liste des emplois</h2>
    <ul>
      <li v-for="emploi in emplois" :key="emploi.id">
        {{ emploi.titre }} - {{ emploi.departement }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import useEmplois from "@/composables/useEmplois";

const { emplois, fetchEmplois } = useEmplois();
onMounted(() => {
  fetchEmplois();
});
</script>
