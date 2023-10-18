<template>
    <NuxtLayout name="dashboard">
        <section class="section" style="padding-top: 40px;">
            <div class="container-fluid">
                <div class="block-section">
                    <div class="block-content">
                        <div class="">

                            <div class="d-flex justify-content-end mb-3">
                                <Button on @click="printPreview" label="Print" icon="pi pi-save" class="ml-3" />  

                                <Button on @click="deleteInvoice" label="Delete" severity="danger" icon="pi pi-trash" class="ml-3" />
                 
                  </div>

                            <div class="surface-card p-4 shadow-2 border-round">
                                <div class="font-medium text-3xl text-900 mb-3">Quotation</div>
                                <div class="text-500 mb-5"> {{  data.name }} </div>
                                <ul class="list-none p-0 m-0 border-top-1 border-300">

                                    <li class="flex align-items-center py-3 px-2 flex-wrap surface-ground">
                                        <div class="text-500 w-full md:w-2 font-medium">Cost Excluding VAT</div>
                                        <div class="text-900 w-full md:w-10">$ {{ cost_ex_vat }}</div>
                                    </li>

                                    <li class="flex align-items-center py-3 px-2 flex-wrap">
                                        <div class="text-500 w-full md:w-2 font-medium">VAT </div>
                                        <div class="text-900 w-full md:w-10 line-height-3">$ {{  vat }} </div>
                                    </li>

                                    <li class="flex align-items-center py-3 px-2 flex-wrap surface-ground">
                                        <div class="text-500 w-full md:w-2 font-medium">Cost Including VAT</div>
                                        <div class="text-900 w-full md:w-10"> $ {{ cost_in_vat }}</div>
                                    </li>

                                    <li class="flex align-items-center py-3 px-2 flex-wrap surface-ground">
                                        <div class="text-500 w-full md:w-2 font-medium"> Non Taxable Amount </div>
                                        <div class="text-900 w-full md:w-10">$ {{ non_taxable_amount }}</div>
                                    </li>


                                    <li class="flex align-items-center py-3 px-2 flex-wrap">
                                        <div class="text-500 w-full md:w-2 font-medium">Total Costs</div>
                                        <div class="text-900 w-full md:w-10 line-height-3"> $ {{total_costs }}</div>
                                    </li>


                                    <li class="flex align-items-center py-3 px-2 flex-wrap surface-ground">
                                        <div class="text-500 w-full md:w-2 font-medium">Series</div>
                                        <div class="text-900 w-full md:w-10">{{  data.series }}</div>
                                    </li>

                                    <li class="flex align-items-center py-3 px-2 flex-wrap">
                                        <div class="text-500 w-full md:w-2 font-medium">Cost Center </div>
                                        <div class="text-900 w-full md:w-10 line-height-3">{{  data.cost_center }} </div>
                                    </li>

                                    <li class="flex align-items-center py-3 px-2 flex-wrap surface-ground">
                                        <div class="text-500 w-full md:w-2 font-medium"> Currency</div>
                                        <div class="text-900 w-full md:w-10"> {{ data.currency }}</div>
                                    </li>

                                    <li class="flex align-items-center py-3 px-2 flex-wrap surface-ground">
                                        <div class="text-500 w-full md:w-2 font-medium">Valid Until</div>
                                        <div class="text-900 w-full md:w-10">{{ data.valid_until }}</div>
                                    </li>
                                    <li class="flex align-items-center py-3 px-2 flex-wrap">
                                        <div class="text-500 w-full md:w-2 font-medium">Date</div>
                                        <div class="text-900 w-full md:w-10">{{ formatDate(data.date) }}</div>

                                       </li> 

                                    <li class="flex align-items-center py-3 px-2 flex-wrap surface-ground">
                                        <div class="text-500 w-full md:w-2 font-medium">Bank</div>
                                        <div class="text-900 w-full md:w-10">
                                            <div class="grid mt-0 mr-0">
                                                <div class="text-900 w-full md:w-10">{{ data.bank}}</div>
                                               
                                            </div>
                                        </div>
                                        
                                    </li>
                                    <li class="flex align-items-center py-3 px-2 flex-wrap">
                                        <div class="text-500 w-full md:w-2 font-medium">Customer</div>
                                        <div class="text-900 w-full md:w-10 line-height-3">{{  data.customer }}</div>
                                    </li>



                                </ul>
                                

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
        </section>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuotationStore } from '~/stores/quotation';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from "axios";

const router = useRouter();
const quotationStore = useQuotationStore();
const data = ref({
    customer: null,
    cost_center: null,
    currency: null,
    name: null,
    series: null,
    bank: null,
    date: null,
    terms: null,
    valid_until: null,
    vat: 0,
    non_taxable_amount: 0,
    cost_excluding_vat: 0,
    cost_including_vat: 0,
    total_costs: 0,
    items: null
});


const cost_ex_vat = computed(() => {
    return data.value.cost_excluding_vat.toFixed(2);
});

const vat = computed(() => {
    return data.value.vat.toFixed(2);
});

const cost_in_vat = computed(() => {
    return data.value.cost_including_vat.toFixed(2);
});

const non_taxable_amount = computed(() => {
    return data.value.non_taxable_amount.toFixed(2);
});


const total_costs = computed(() => {
    return data.value.total_costs.toFixed(2);
});

    const formatDate = (value) => {

    const date = new Date(value);

    const day = date.getUTCDate();

    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

    const year = date.getUTCFullYear();



    const formattedDate = `${day} ${month} ${year}`;

    return formattedDate;

    };


const { params: { id } } = useRoute()


onMounted(async () => {
    let result = await quotationStore.detailQuote(id)

    
    data.value = result.data.invoice




});

const printPreview = () => {
    const invoiceData = {
        selectedCustomer: data.value.customer,
        selectedSeries: data.value.series,
        selectedAccount: data.value.bank,
        date: data.value.date,
        vat: data.value.vat,
        name: data.value.name,
        cost_excluding_vat: data.value.cost_excluding_vat,
        non_taxable_amount: data.value.non_taxable_amount,
        cost_including_vat: data.value.cost_including_vat,
        total_costs: data.value.total_costs,
        items: data.value.items,
        terms: data.value.terms

    };

    router.push({
        path: '/quotation/print_preview',
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
        url: '/quotation/delete',
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
        router.push('/list');
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
  border: 1px solid rgb(27, 12, 156);
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
            padding: 10px;
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