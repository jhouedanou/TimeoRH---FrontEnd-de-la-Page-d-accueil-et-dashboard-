<template>
  <div v-if="isVisible" class="popup">
    <div class="popup-content">
      <h2>CV du candidat</h2>
      <div class="cv-details">
        <!-- Ajoutez ici les détails du CV -->
        <p>Nom : John Doe</p>
        <p>Email : john.doe@example.com</p>
        <p>Expérience : 5 ans en développement web</p>
        <p>Compétences : Vue.js, JavaScript, HTML, CSS</p>
      </div>
    </div>
    <button @click="$emit('close')" class="close-button">Fermer</button>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: Boolean,
  },
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
}

.close-button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
</style>
