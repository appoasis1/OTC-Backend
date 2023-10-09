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
                  <!-- <td>{{ invoice.number }}</td>
                  <td>{{ invoice.date }}</td>
                  <td>{{ invoice.customer }}</td>
                  <td>{{ invoice.total }}</td> -->
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
                  <!-- <tr v-for="item in invoice.items" :key="item.id">
                    <td>{{ item.description }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.unit_price }}</td>
                    <td>{{ item.total }}</td>
                  </tr> -->
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
import { useRoute } from 'vue-router';
import axios from 'axios';

const invoiceStore = useInvoiceStore();
const { params: { id } } = useRoute();
const detail = ref();


onMounted(() => {
  
  console.log(id);
  
  const getInvoiceDetails = async () => {
          
          var data = JSON.stringify({
              "id": id,
          });
          var config = {
              method: 'post',
              url: '/invoice/detail/',
              headers: { 
                  'Content-Type': 'application/json'
              },
              data: data
          };

          const result: any = await axios(config).then(function (response) {
              console.log(JSON.stringify(response.data));
              detail.value = response.data.data;

              return {
                  data: response.data,
                  success: true
                  }
          })
          .catch(function (error) {
              console.log(error);
              return {
                  success: false
                  }
          });
          return result;
          }

          getInvoiceDetails();

 
  });
   const deleteInvoice = () => {
    //  TODO: Implement invoice deletion
  }

</script>
