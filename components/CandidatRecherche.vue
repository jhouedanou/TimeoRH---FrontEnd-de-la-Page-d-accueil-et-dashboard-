<template>
  <div class="cv-container indreloire">
    <header class="cv-header">
      <img :src="candidat.image" :alt="candidat.nom" class="profile-image" />
      <div class="header-info">
        <h1>{{ candidat.nom }} {{ candidat.prenom }}</h1>
        <h2>{{ candidat.titre }}</h2>
      </div>
    </header>

    <section class="cv-section">
      <h3>Informations personnelles</h3>
      <p><strong>Email:</strong> {{ candidat.email }}</p>
      <p><strong>Téléphone:</strong> {{ candidat.telephone }}</p>
      <p><strong>Localisation:</strong> {{ candidat.geolocalisation }}</p>
    </section>

    <section class="cv-section">
      <h3>Compétences</h3>
      <div class="skills-container">
        <span v-for="competence in candidat.competences" :key="competence" class="skill-tag">
          {{ competence }}
        </span>
      </div>
    </section>

    <section class="cv-section">
      <h3>Expérience professionnelle</h3>
      <div v-for="exp in candidat.experienceSpecifique" :key="exp.titre" class="experience-item">
        <h4>{{ exp.titre }}</h4>
        <p>Durée: {{ exp.duree }} ans | Manager: {{ exp.manager ? 'Oui' : 'Non' }}</p>
        <p><strong>Mission principale:</strong> {{ exp.mission_principale }}</p>
        <ul>
          <li v-for="activite in exp.activiteliees" :key="activite">{{ activite }}</li>
        </ul>
      </div>
    </section>

    <section class="cv-section">
      <h3>Formation</h3>
      <ul>
        <li v-for="edu in candidat.education" :key="edu">{{ edu }}</li>
      </ul>
    </section>

    <section class="cv-section">
      <h3>Langues</h3>
      <ul>
        <li v-for="langue in candidat.langues" :key="langue.langue">
          {{ langue.langue }} - {{ langue.niveau }} ({{ langue.expression }})
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  candidat: Object,
  adequation: Number
});

const matchColorClass = computed(() => {
  if (props.adequation >= 80) return 'match-green';
  if (props.adequation >= 60) return 'match-orange';
  return 'match-red';
});
</script>
<style lang="scss" scoped>
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
  z-index: 1000;
}

.popup-content {
  background-color: #f3f3f3;
  padding: 20px;
  border-radius: 5px;
  max-width: 90vw;
  max-height: 90vh;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.candidat {
  /* Styles pour le conteneur du candidat */
}

.candidat-info {
  /* Styles pour les informations du candidat */
}

strong {
  color: black !important;
}


.candidat-info {
  font-size: 25px;
  font-weight: 500;


  line-height: 1.2;


  color: #012e61;







}

.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-button {
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  border-radius: 20px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
  background-color: #f3f3f3;
  font-size: 16px;
  font-weight: bold;
  color: #002160;
}

.candidat {
  border-radius: 8px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.15);
  border: solid 1px #f3f3f3;
  background-color: #fff;
  margin-bottom: 4em;
  padding: 1.5em;
}

.onez {
  margin-bottom: 2em;

  img {
    object-fit: cover;
  }
}

.twoz {
  padding: 0 1em;

  h3 {
    font-size: 25px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: left;
    color: #000;
    margin-bottom: 0.5em;
  }

  .titre {
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: left;
    color: #a4a4a4;
    margin-bottom: 0.5em;
  }
}

.nfo {
  margin-bottom: 0.5em;

  p {
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.9;
    letter-spacing: normal;
    text-align: left;
    color: #002160;
  }
}

.skills-container {
  margin-bottom: 1.5em;
}

.points-forts {
  margin-bottom: 1.5em;

  h4 {
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: left;
    color: #002160;
    margin-bottom: 0.5em;
  }

  p {
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.9;
    letter-spacing: normal;
    text-align: left;
    color: #002160;
    margin-bottom: 0.5em;
  }
}

.levraimatch {
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.9;
  letter-spacing: normal;
  text-align: right;

  &::after {
    position: absolute;
    z-index: 10;
  }

  &.match-green {
    color: green;

    &::after {
      content: "";
      display: block;
      height: 36px;
      width: 36px;
      background: url("/images/100.svg");
    }
  }

  &.match-orange {
    color: orange;

    &::after {
      display: block;
      content: "";
      height: 36px;
      width: 36px;
      background: url("/images/101.svg");
    }
  }

  &.match-red {
    color: red;

    &::after {
      display: block;
      content: "";
      height: 36px;
      width: 36px;
      background: url("/images/102.svg");
    }
  }
}

.madjoua {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 1.5em;
  flex-flow: row;
  flex-wrap: wrap;
  position: relative;

  p {
    width: 90%;
    height: 45px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    font-size: 13px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #002160;
    position: relative;

    &::after {
      position: absolute;
      z-index: 10;
      top: 0;
      right: 0;
    }
  }
}

.trunks {
  img {
    width: 114px;
    height: 114px;
    border-radius: 100%;
  }
}

.macine {
  margin-top: 1em;
  border-radius: 6px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  border: solid 2px #d7d7d7;
  background-color: #fff;
  padding: 1em;
  flex-direction: column;

  h2 {
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.4;
    letter-spacing: normal;
    text-align: left;
    color: #012e61;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    font-stretch: normal;
    font-style: normal;
    line-height: 14px;
    letter-spacing: normal;
    text-align: left;
    color: #9297a6;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    margin-bottom: 0.45rem;
  }
}

.neay {
  padding-left: 10px;
}

.candidat-parfait {
  width: 151px;
  height: 30px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-left: 1.5em;
  background: rgba(249, 231, 190, 0.42) url(/images/star-svgrepo-com.svg) center left no-repeat;
}

.brad {
  font-family: "Open Sans", sans-serif;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.92;
  letter-spacing: -0.48px;
  text-align: center;
  color: #012e61;
  display: flex;
  text-align: center;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 0 auto;
}

.vegeta {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-size: 13px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.08;
    letter-spacing: normal;
    text-align: center;
    color: #18191c;
    position: relative;
    margin-top: 1em;
  }

  .match {
    position: relative;
  }

  .match-green {
    .brad {
      position: relative;
      width: 71px;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      &::after {
        background: url("/images/201.svg");
        width: 71px;
        height: 72px;
        content: "";
        display: block;
        position: absolute;

        position: absolute;
        top: 0;
        margin: auto;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }
  }

  .match-orange {
    .brad {
      position: relative;
      width: 71px;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      &::after {
        background: url("/images/200.svg");
        width: 71px;
        height: 72px;
        content: "";
        display: block;
        position: absolute;

        position: absolute;
        top: 0;
        margin: auto;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }
  }

  .match-red {
    .brad {
      position: relative;
      width: 71px;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      &::after {
        background: url("/images/202.svg");
        width: 71px;
        height: 72px;
        content: "";
        display: block;
        position: absolute;

        position: absolute;
        top: 0;
        margin: auto;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }
  }
}

.progress-bar-container {
  width: 100%;
  height: 40px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  &::after {
    content: "";
    height: 2px;
    width: 100%;
    background: #d7d7d7;
    top: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
  }
}

.progress-bar {
  z-index: 1;
  height: 100%;
  background-color: #dc9756;
  border-radius: 10px;
  height: 10px;
  transition: width 1s ease-in-out;
}

.progress-text {
  z-index: 2;
  width: 33px;
  height: 29px;
  border-radius: 4px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  color: #000;
  font-weight: bold;
  font-size: 11px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.55;
  letter-spacing: normal;
  text-align: left;
  color: #000;
}

.coleen {
  &:nth-of-type(2) {
    p {
      font-family: "Open Sans", sans-serif;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.43;
      letter-spacing: normal;
      text-align: left;
      color: rgba(0, 0, 0, 0.7);
    }
  }
}

.documentsducandidat {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding: 1em;
  background-color: #f9f8ff;
  border-radius: 5px;
  border: solid 1px #a5aab5;
  background-color: #fff;

  .h4 {
    font-family: "Open Sans", sans-serif;
    width: 100%;
    display: block;
    border-bottom: 1px solid #e6e6e6;
    padding-bottom: 1em;
    margin-bottom: 1em;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2;
    letter-spacing: normal;
    text-align: left;
    color: #747474;
  }

  .wrapperdoc {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    gap: 1px;

    a {
      &:nth-of-type(3) {
        button {
          border: #d62828 1px solid !important;
          color: #d62828 !important;

          &:hover {
            background-color: #d62828 !important;
            border: #d62828 1px solid !important;
            color: white !important;
          }
        }
      }

      button {
        font-family: "Open Sans", sans-serif;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 2;
        letter-spacing: normal;
        text-align: left;
        color: #005bbe;
        height: 33px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding: 10px;
        border-radius: 4px;
        border: solid 1px #005bbe;
        background-color: #f9f9f9;
        margin-right: 1em;

        &:hover {
          background: #005bbe;
          border: #005bbe 1px solid;
          color: white;
        }
      }
    }

    .doc {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: row;
      gap: 1em;

      .doc-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        gap: 1em;

        .doc-icon-img {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
          gap: 1em;
        }
      }
    }
  }
}

.popup-content {
  position: relative;
  padding: 3em;
}

.todd {
  background: rgb(152, 152, 152);
  color: white;
  padding: 10px;
  position: absolute;
  right: 10px;
  top: 10px;

  filter: alpha(opacity=50);
  /* internet explorer */
  -khtml-opacity: 0.5;
  /* khtml, old safari */
  -moz-opacity: 0.5;
  /* mozilla, netscape */
  opacity: 0.5;

  /* fx, safari, opera */
  &:hover {
    filter: alpha(opacity=100);
    /* internet explorer */
    -khtml-opacity: 1;
    /* khtml, old safari */
    -moz-opacity: 1;
    /* mozilla, netscape */
    opacity: 1;
    /* fx, safari, opera */
  }
}

.neay {
  span {
    font-size: 12px;
    margin-right: 10px;
  }
}

.interviewdecision {
  .tabs {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 1em;
    margin-bottom: 1em;

    li {
      cursor: pointer;
    }

    .tab {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      gap: 1em;
      padding: 10px;
      border-radius: 4px;
      border: solid 1px #005bbe;
      background-color: #f9f9f9;
      font-family: "Open Sans", sans-serif;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 2;
      letter-spacing: normal;
      text-align: left;
      color: #005bbe;

      &:hover {
        background: #005bbe;
        border: #005bbe 1px solid;
        color: white;
      }
    }
  }
}

.tabs {
  border-radius: 7.6px;
  border: solid 1.1px #c6c6c6;
  background-color: #fff;

  li {
    padding: 1em;
    color: black;

    &.active,
    &:hover {
      border-radius: 7.6px;
      background-color: #dc9756;
      color: black;
    }
  }
}

.peyton {
  border-radius: 6.5px;
  border: solid 1.1px #e6e6e6;
  background-color: #fff;

  padding: 1em;

  h3 {
    font-size: 15.2px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 2;
    letter-spacing: normal;
    text-align: left;
    color: #18191c;
    border-bottom: 1px solid #e6e6e6;
  }
}

.peyton {

  input,
  textarea {
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.73;
    letter-spacing: normal;
    text-align: left;
    color: #000;
    border-radius: 3px;
    border: solid 1px #a4a4a4;
    background-color: #fff;
  }
}

.cv-container {
  width: 80vw;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  height: 80vh;
  overflow: scroll;
  color: #012e61;
}

.cv-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 30px;
}

.header-info h1 {
  font-size: 2.5em;
  margin-bottom: 5px;
  font-weight: bold;
  color: #012e61;
}

.header-info h2 {
  font-size: 1.5em;
  color: #023e7d;
  font-weight: bold;
}

.cv-section {
  margin-bottom: 30px;
}

.cv-section h3 {
  font-size: 1.8em;
  border-bottom: 2px solid #034694;
  padding-bottom: 5px;
  margin-bottom: 15px;
  font-weight: bold;
  color: #034694;
}

.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skill-tag {
  background-color: #f0f0f0;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9em;
}

.experience-item {
  margin-bottom: 20px;
}

.experience-item h4 {
  font-size: 1.2em;
  margin-bottom: 5px;
  font-weight: bold;
  color: #0353a4;
}

ul {
  padding-left: 20px;
}

.close-button {
  background-color: #012e61;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.close-button:hover {
  background-color: #023e7d;
}
</style>
