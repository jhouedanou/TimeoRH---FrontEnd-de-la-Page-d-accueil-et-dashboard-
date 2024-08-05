<script setup>
import { useIndexContent } from "~/composables/index";

const { content } = useIndexContent();
</script>

<template>
  <div class="container">
    <h1>{{ content.siteName }}</h1>
    <img :src="content.logo" :alt="content.siteName" />
    <p>{{ content.slogan }}</p>
  </div>
</template>
