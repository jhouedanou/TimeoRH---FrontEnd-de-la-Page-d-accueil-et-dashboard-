<template>
  <header class="header">
    <div class="header-content container">
      <div class="columns">
        <div class="logo-wrapp column is-2-desktop is-2-tablet is-12-mobile">
          <NuxtLink to="/dashboard" aria-label="Retour à l'accueil">
            <NuxtImg
              :src="globalData.logo"
              alt="Logo"
              class="logo-dashboard"
              loading="lazy"
              format="webp"
              quality="80"
            />
          </NuxtLink>
        </div>
        <div class="column is-9-desktop is-9-tablet is-12-mobile">
          <div class="field">
            <div class="control">
              <div class="input-wrapper">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Recherche d'un profil ou de compétences...."
                />
                <button class="search-button">
                  <span class="material-icons">search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="column is-1-desktop is-1-tablet is-12-mobile is-flex is-justify-content-center is-align-items-end"
        >
          <div
            class="dropdown is-right"
            :class="{ 'is-active': isNotificationDropdownActive }"
          >
            <div
              class="dropdown-trigger"
              :class="{ 'has-notifications': hasNotifications }"
            >
              <button
                class="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
                @click="toggleNotificationDropdown"
              >
                <span class="icon">
                  <span class="material-icons">notifications</span>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
              <div class="dropdown-content">
                <div class="dropdown-content">
                  <a
                    v-for="notif in notifications"
                    :key="notif.id"
                    href="#"
                    class="dropdown-item"
                    @click.prevent="
                      showPopup(notif);
                      deleteNotification(notif.id);
                    "
                  >
                    {{ notif.title }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <teleport to="body">
    <div v-if="showPopupContent" class="modal is-active">
      <div class="modal-background" @click="closePopup"></div>
      <div class="modal-content">
        <div class="box">
          <h3 class="title is-4">{{ currentNotification.title }}</h3>
          <p>{{ currentNotification.content }}</p>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="closePopup"
      ></button>
    </div>
  </teleport>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useGlobalData } from "@/composables/useGlobalData";
import { useRecruteursJson } from "@/composables/useRecruteurs";
const { data: globalData } = useGlobalData();
const { data: recruteurs } = useRecruteursJson();
const router = useRouter();
const isNotificationDropdownActive = ref(false);
const notifications = computed(() => {
  const recruteur = recruteurs.value.recruteurs.find(
    (r) => r.recruteur_id === 1
  );
  return recruteur ? recruteur.notifications : [];
});
const showPopupContent = ref(false);
const currentNotification = ref({});
const updateNotificationStatus = () => {
  hasNotifications.value = notifications.value.length > 0;
};

const showPopup = (notification) => {
  currentNotification.value = notification;
  showPopupContent.value = true;
};

const closePopup = () => {
  showPopupContent.value = false;
};

const searchQuery = ref("");
const hasNotifications = computed(() => notifications.value.length > 0);

function toggleNotificationDropdown() {
  isNotificationDropdownActive.value = !isNotificationDropdownActive.value;
}

const removeNotification = (event) => {
  event.target.remove();
  updateNotificationStatus();
};

const deleteNotification = (notificationId) => {
  notifications.value = notifications.value.filter(
    (n) => n.id !== notificationId
  );
  updateNotificationStatus();
};

function redirectToSearch() {
  router.push({ name: "search", query: { q: searchQuery.value } });
}

onMounted(() => {
  const dropdownContent = document.querySelector(".dropdown-content");
  hasNotifications.value = dropdownContent.children.length > 0;
  console.log(hasNotifications.value);
});
</script>

<style lang="scss" scoped>
.dropdown-trigger {
  button {
    background: white;
    border: none;
  }
}
.logo-wrapp {
  padding: 20px 0 0 0;
}
.header {
  padding: 1rem 0;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.logo {
  max-height: 40px;
}
.input-wrapper {
  position: relative;
  display: inline-block;
  input {
    width: 100vw;
    max-width: 529px;
    height: 48px;
    align-self: stretch;
    flex-grow: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    padding: 7px 8px 5px;
    border-radius: 8px;
    border: solid 1px rgba(28, 28, 30, 0.48);
    background-color: rgba(255, 255, 255, 0);
  }
}

.search-button {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
}

.material-icons {
  font-size: 20px;
  color: #999;
}
.dropdown-trigger.has-notifications::after {
  content: "";
  position: absolute;
  top: 5px;
  right: 5px;
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 50%;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
