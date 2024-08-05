<template>
  <div>
    <h2>Liste des interviews</h2>
    <ul>
      <li v-for="interview in interviews" :key="interview.id">
        {{ interview.date }} - {{ interview.heure }} - {{ interview.type }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import useInterviews from "@/composables/useInterviews";

const { interviews, fetchInterviews } = useInterviews();

onMounted(() => {
  fetchInterviews();
});
</script>
