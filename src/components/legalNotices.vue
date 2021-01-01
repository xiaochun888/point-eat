<template>
<div class="legal-notices container">
  <div class="content">
  <br>
  <p>
  Informations légales
  <br>
  Conformément aux dispositions de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, nous vous informons que :
  <br>
  <br>
  Le site web est édité par :
  <br>
  Point Eat
  <br>
  <!-- Numéro SIRET : -->
  <!-- <br>
  Siège social : 15 Bis Avenue du Moulin de Saquet 94400 Vitry-Sur-Seine
  <br> -->
  <br>
  Email : contact@point-eat.fr
  <br>
  <br>
  Le directeur de la publication du site web est Xiaochun ZHONG.
  <br>
  <br>
  Le site  est hébergé par IONOS, 7, place de la Gare BP 70109 57200 Sarreguemines C, www.ionos.fr/.
  <br>
  <!-- <br>
  Site réalisé par Point Eat -->
  </p>
  </div>
  <app-footer></app-footer>
</div>
</template>
<script lang="js">
import appFooter from '@/components/appFooter.vue';
export default {
  name: 'legal-notices',
  components: {
    appFooter
  }
};
</script>
<style scoped lang="scss">
.legal-notices {
  border-top: 1px solid #fe5815;
  height: calc(100% - 3.5em);
  .content {
    font-size: 0.8em;
    height: calc(100% - 9em);
  }
}
</style>
