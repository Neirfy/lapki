
<script setup lang="ts">
// import Filter from '@/components/animals/Filter.vue';
import SortOrganizationFilter from '@/components/animals/SortOrganizationFilter.vue';
import EditCard from '@/components/animals/EditCard.vue';
import Pagination from '@/components/Pagination.vue';

</script>

<template>
    <div class="main-content">
      <SortOrganizationFilter></SortOrganizationFilter>
      <EditCard />
      <Pagination />

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
