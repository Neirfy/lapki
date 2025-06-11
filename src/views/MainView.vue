
<script setup lang="ts">
import Filter from '@/components/animals/Filter.vue';
import SortUserFilter from '@/components/animals/SortUserFilter.vue';
import Card from '@/components/animals/Card.vue';
import Pagination from '@/components/Pagination.vue';
</script>

<template>
    <Filter></Filter>
    <div class="main-content">
      <SortUserFilter></SortUserFilter>
      <Card />
      <Pagination />
    </div>
</template>
