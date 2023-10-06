<template>
  <NuxtLayout name="dashboard">
    <section class="section">
      <div class="container-fluid">
        <div class="card-style">
          <div class="header">
            <h1>Invoice</h1>
          </div>
          <div class="body">
            <table class="table">
              <thead>
                <tr>
                  <th>Invoice Number</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ invoice.number }}</td>
                  <td>{{ invoice.date }}</td>
                  <td>{{ invoice.customer }}</td>
                  <td>{{ invoice.total }}</td>
                </tr>
              </tbody>
            </table>

            <div class="items">
              <h2>Items</h2>
              <table class="table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in invoice.items" :key="item.id">
                    <td>{{ item.description }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.unit_price }}</td>
                    <td>{{ item.total }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useInvoiceStore } from '~/stores/sales_invoice';
import { reactive, onMounted } from 'vue';

const invoiceStore = useInvoiceStore();
const invoice = reactive({
  number: '',
  date: '',
  customer: null,
  items: [],
  total: 0,
});
console.log('invoice', invoice)

const router = useRouter();

onMounted(() => {
  const invoiceId = router.params.id;
  invoiceStore.getInvoice(invoiceId).then((response) => {
    invoice.number = response.data.number;
    invoice.date = response.data.date;
    invoice.customer = response.data.customer;
    invoice.items = response.data.items;
    invoice.total = response.data.total;
  });

  const deleteInvoice = () => {
    //  TODO: Implement invoice deletion
  }
  });
  

</script>
