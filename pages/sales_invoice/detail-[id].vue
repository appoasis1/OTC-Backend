<template>
  <NuxtLayout name="dashboard">
      <section class="section" style="padding-top: 40px;">
          <div class="container-fluid">
                  <div class="block-section">
                      <div class="block-content">
                          <div class="">
                              <div class="surface-ground px-4 py-8 md:px-6 lg:px-8">
                                  <div class="text-900 font-medium text-xl mb-1"><h1>Sales Invoice Detail</h1></div>
                                  <div class="d-flex justify-content-end mb-3">  
                                        <Button on @click="printPreview" label="Print" icon="pi pi-save" class="ml-3" />  
                                        <Button on @click="deleteInvoice" label="Delete" severity="danger" icon="pi pi-trash" class="ml-3" />
                                    </div>
                                  <div class="surface-card p-4 shadow-2 border-round p-fluid">
                                    <div  class="grid grid-nogutter  surface-border pt-2">
                                        <div class="col-12 md:col-6 p-3">
                                            <div class="text-500 font-medium mb-2">Invoice</div>
                                            <div class="text-900">{{ data.name }} </div>
                                        </div>
                                        <div class="col-12 md:col-6 p-3">
                                            <div class="text-500 font-medium mb-2">Customer</div>
                                            <div class="text-900">{{ data.customer }}</div>
                                        </div>
                                        <div class="col-12 md:col-6 p-3">
                                            <div class="text-500 font-medium mb-2">Cost Center</div>
                                            <div class="text-900">{{ data.cost_center }}</div>
                                        </div>
                                        <div class="col-12 md:col-6 p-3">
                                            <div class="text-500 font-medium mb-2">Currency</div>
                                            <div class="text-900">{{ data.currency }}</div>
                                        </div>
                                        <div class="col-12 md:col-6 p-3">
                                            <div class="text-500 font-medium mb-2">Advance Payment</div>
                                            <div class="text-900">$ {{ advance_payment }}</div>
                                        </div>
                                        <div class="col-12 md:col-6 p-3">
                                            <div class="text-500 font-medium mb-2">Amount Due</div>
                                            <div class="text-900">$ {{ amount_due }}</div>
                                        </div>
                                        <div class="col-12 md:col-6 p-3">
                                            <div class="text-500 font-medium mb-2">Bank</div>
                                            <div class="text-900">{{ data.bank }}</div>
                                        </div>
                                        <div class="col-12 md:col-6 p-3">
                                            <div class="text-500 font-medium mb-2">Series</div>
                                            <div class="text-900">{{ data.series }}</div>
                                        </div>
                                        <div class="col-12 md:col-6 p-3">
                                            <div class="text-500 font-medium mb-2">Non Taxable Amount</div>
                                            <div class="text-900">$ {{ non_taxable_amount }}</div>
                                        </div>
                                        <div class="col-12 md:col-6 p-3">
                                            <div class="text-500 font-medium mb-2">Taxable Amount</div>
                                            <div class="text-900">$ {{ taxable_amount}}</div>
                                        </div>
                                        <div class="col-12 md:col-6 p-3">
                                            <div class="text-500 font-medium mb-2">Total Charges</div>
                                            <div class="text-900">$ {{ total_charges }}</div>
                                        </div>
                                        <div class="col-12 md:col-6 p-3">
                                            <div class="text-500 font-medium mb-2">VAT</div>
                                            <div class="text-900">$ {{ vat }}</div>
                                        </div>
                                        <div   class="surface-card grid grid-nogutter border-round borderrangu">
                                  <table class="col-12 md:col-12">
                                    <thead>
                                        <tr class="table-header">
                                        <th>Item </th>
                                        <th>Vehicle</th>
                                        <th >Vehicle Type</th>
                                        
                                        <th>Quantity</th>
                                        <th>Rate $</th>
                                        <th>Amount $</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in data.items" >
                                        <td>{{ item.item }}</td>
                                        <td>{{ item.vehicle }}</td>
                                        <td>{{ item.vehicle_type }}</td>
                                        <td>{{ item.quantity }}</td>
                                        <td>{{ item.rate}}</td>
                                        <td>{{ item.amount }}</td>
                                        
                                        
                                         </tr>
                                    </tbody>
                                    </table>

                                    
                                  </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
        </section>
    </NuxtLayout>
</template>

<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useInvoiceStore } from '~/stores/sales_invoice';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from "axios";

  const router = useRouter();
  const invoiceStore = useInvoiceStore();
  const data = ref({
            customer: null,
            cost_center: null,
            currency: null,
            name: null,
            series: null,
            bank: null,
            date: null,
            terms: null,
            vat: 0,
            non_taxable_amount: 0,
            amount_due: 0,
            taxable_amount:0,
            advance_payment: 0,
            total_charges: 0,
            items: null
            });

    const taxable_amount = computed(() => {
        return data.value.taxable_amount.toFixed(2);
    });

    const vat = computed(() => {
        return data.value.vat.toFixed(2);
    });

    const amount_due = computed(() => {
        return data.value.amount_due.toFixed(2);
    });

    const non_taxable_amount = computed(() => {
        return data.value.non_taxable_amount.toFixed(2);
    });

    const advance_payment = computed(() => {
        return data.value.advance_payment.toFixed(2);
    });

    const total_charges = computed(() => {
        return data.value.total_charges.toFixed(2);
    });


  const {params: {id}} = useRoute()

  //console.log("njnjnjn",id)
  
  onMounted( async() => {
     let result = await invoiceStore.detailInvoice(id)

    // console.log("mbilimbi",result)
     data.value = result.data.invoice

    // console.log('micnjcnjncd',invoiceData.value)
    
    
  });

  const printPreview = () => {
        const invoiceData = {
            selectedCustomer: data.value.customer,
            selectedSeries: data.value.series,
            selectedAccount: data.value.bank,
            date: data.value.date,
            vat: data.value.vat,
            taxable_amount: taxable_amount.value,
            non_taxable_amount: data.value.non_taxable_amount,
            amount_due: data.value.amount_due,
            total_charges: data.value.total_charges,
            advance_payment: data.value.advance_payment,
            items: data.value.items,
            terms: data.value.terms

        };

        router.push({
        path: '/sales_invoice/print_preview',
        query: {
        invoiceData: JSON.stringify(invoiceData)
     }
    });
    };

  const deleteInvoice = async () => {
          
          var data = JSON.stringify({
              "id": id,
          });
          var config = {
              method: 'post',
              url: '/invoice/delete',
              headers: { 
                  'Content-Type': 'application/json'
              },
              data: data
          };

          const result: any = await axios(config).then(function (response) {
              console.log(JSON.stringify(response.data.data));

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

          if (result.success) {
            router.push('/sales_invoice/list');
        }
          return result;
    }

</script>

<style>
  .table-wrapper {
      width: 100%;
  }

  .full-width-table {
      width: 100% !important;
  }   

  .p-add-chip {
      margin-top: 0.1rem !important;
      background: var(--green-500) !important;
      color: var(--primary-color-text) !important;
  }

  .p-add-chip-disabled {
      margin-top: 0.1rem !important;
      background: var(--gray-500) !important;
      color: var(--primary-color-text) !important;
  }

  .p-chips-token {
      margin-top: 0.1rem !important;
      background: var(--primary-color) !important;
      color: var(--primary-color-text) !important;
  }

  .p-dialog-mask.p-component-overlay.p-component-overlay-enter {
      z-index: 1101 !important;
  }

  .my-table {
  border-collapse: collapse;
  width: 300px;
}

.delete-btn {
  background-color: red;
  color: white;
  outline: none;
}

.my-table th,
.my-table td {
  border: 1px solid black;
  padding: 8px;
  text-align: right;
}

.my-table th {
  background-color: #f2f2f2;
  text-align: left;
}
</style>

<style lang="scss" scoped>
  .field * {
      display: grid;
  }

  small {
      margin-top: 0.4rem;
  }

  .flex {
      display: flex;
  }
  .borderrangu {
    border: solid 1px #c3c3c3;
    margin-top: 15px !important;
    }
    table {
            width: 1030px;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        table, th, td {
            border: 1px solid #ccc;
        }
        th, td {
            padding: 8px;
            text-align: left;
        }
        .table-header {
            background-color: #f2f2f2;
            font-weight: bold;
        }

        .text-900.toalam {
            font-size: 30px;
            font-weight: 900;
        }
  
</style>