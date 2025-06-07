
<script setup lang="ts">
// import Filter from '@/components/animals/Filter.vue';
import SortOrganizationFilter from '@/components/animals/SortOrganizationFilter.vue';
import Card from '@/components/animals/Card.vue';
</script>

<template>
  <div
    class="page-layout"
  >
    <!-- <Filter></Filter> -->
    <div class="right-column">
      <SortOrganizationFilter></SortOrganizationFilter>

      <Card />
    </div>
  </div>
</template>

<style>
.page-layout {
  display: flex;
  height: 100%;
  gap: 16px;
}
.right-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 2;
}

</style>
