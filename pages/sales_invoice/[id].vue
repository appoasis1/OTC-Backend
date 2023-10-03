<template>
    <div>
      <h1>Invoice Item Details</h1>
      <div>
        <strong>Name:</strong> {{ item.name }}
      </div>
      <div>
        <strong>Price:</strong> {{ item.price }}
      </div>
      <!-- Additional item details can be displayed here -->
    </div>
  </template>
  
  <script setup lang="ts">
  import { useInvoiceStore } from '~/stores/sales_invoice';
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const invoiceStore = useInvoiceStore();
  const itemId = computed(() => router.params.id);

  const item = computed(() => {
    const items = invoiceStore.items;
    return items.find(item => item.id === itemId);
    });
    
  if (!item.value) {
    alert('something went wrong please refresh the page. If the issue persists please contact support ~ support@petalmafrica.com')
  }

  </script>
  