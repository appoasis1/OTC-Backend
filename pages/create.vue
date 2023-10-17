<template>
    <NuxtLayout name="dashboard">
        <section class="section" style="padding-top: 40px;">
            <div class="container-fluid">
                    <div class="block-section">
                        <div class="block-content">
                            <div class="">
                                <div class="surface-ground px-4 py-8 md:px-6 lg:px-8">
                                    <div class="text-900 font-medium text-xl mb-1"><h1>Quotation</h1></div>
                                    <div class="d-flex justify-content-end mb-3">  
                                        <Button on @click="printPreview" label="Print" icon="pi pi-save" class="ml-3" />  
                                        <Button on @click="createInvoice" label="Save" icon="pi pi-save" class="ml-3" />
                                    </div>
                                    <div class="surface-card p-4 shadow-2 border-round p-fluid">
                                      
                                        <div class="grid formgrid p-fluid">
                                            <div class="field mb-4 col-12 md:col-4">
                                                <label for="company_name" class="font-medium text-900">Series</label><DropDown v-model="selectedSeries" :options="seriesNames"  placeholder="Select Naming Series" class="w-full md:w-34rem" /></div>
                                                <div class="field mb-4 col-12 md:col-4">
                                                    <label for="invoice_id" class="font-medium text-900">Date</label><Calendar v-model="date" showIcon /></div>
                                                    <div class="field mb-4 col-12 md:col-4"><label for="customer_name" class="font-medium text-900">Customer</label><DropDown v-model="selectedCustomer" :options="customerNames"  placeholder="Select Customer" class="w-full md:w-34rem" /> </div>
                                                    <div class="field mb-4 col-12 md:col-4"><label for="customer_name" class="font-medium text-900">Valid Until</label><Calendar v-model="valid_until" showIcon /></div>
                                                   
                                                   
                                                    <div class="field mb-4 col-12 md:col-4"><label for="customer_name" class="font-medium text-900">Banking Details</label><DropDown v-model="selectedAccount" :options="accountNames"  placeholder="Select Bank Account" class="w-full md:w-34rem" /></div>
                                                    <div class="field mb-4 col-12 md:col-4"><label for="customer_email" class="font-medium text-900">Cost Center</label><DropDown v-model="selectedCost" :options="costNames"  placeholder="Select Cost Center" class="w-full md:w-34rem" /></div>
                                                    <div class="field mb-4 col-12 md:col-4"></div>
                                                        <div class="field mb-4 col-12 md:col-4"></div>
                                                                <div class="surface-border border-top-1 opacity-50 mb-4 col-12">
                                                                </div>
                                                                <div class="field mb-4 col-6 md:col-3"><label for="quantity" class="font-medium text-900">Currency</label><DropDown v-model="selectedCurrency" :options="currencyNames"  placeholder="Select Currency" class="w-full md:w-34rem" /></div><div class="field mb-4 col-6 md:col-3"><div class="flex align-content-center">  <div class="field mb-4 col-12 md:col-6"> 
                                                                                                    
                                                                                                    
                                                                                                </div>
                                                                        </div></div>

                                                                        <div class=" mb-4 ml-220 col-6 md:col-3" style="margin-right: 120px;">
                                                                            <div class="card flex flex-column align-items-center">
                                                                                <div class="flex flex-wrap gap-2 mb-8" style="height: 270px;">
                                                                                <div style="padding-left: 10px; padding-top: 40px; padding-bottom: 1px;">
                                                                                    <h4 style="font-family: Arial, sans-serif; font-size: 22px; font-weight: normal; color: #0e0a0a;">
                                                                                        Cost excluding VAT: &nbsp; &nbsp; &nbsp; &nbsp; $ {{ formatted_cost_excluding_vat }} <br><br>
                                                                                    VAT: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;$ {{ formatted_vat }} <br><br>
                                                                                    Cost Inclusive of VAT: &nbsp; &nbsp; &nbsp; $ {{ formatted_cost_including_vat }} <br><br>
                                                                                    Non Taxable Amount:&nbsp; &nbsp; &nbsp; &nbsp; $ {{ formatted_non_taxable_amount }} <br><br>
                                                                                    Total Cost: &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;$ {{ formatted_total_costs }} <br><br>
                                                                                    
                                                                                    </h4>
                                                                                </div>
                                                                                </div>
                                                                            </div>
                                                                            </div>
                                                                        
                                                                            <div class="block-header">
                                                                                        <div style="padding-left: 13px;"></div>
                                                                                        </div>
                                                                                    <div class="field mb-4 col-12 flex align-items-center">
                                                                                            <div class="table-wrapper">
                                                                                                <DataTable :value="itemsTable"  resizableColumns columnResizeMode="expand" showGridlines class="full-width-table">
                                                                                                    <Column header="Number of Vehicles" :style="{ width: '6vw' }">
                                                                                                        <template #body="slotProps">
                                                                                                            {{ slotProps.data.number }}
                                                                                                        </template>
                                                                                                    </Column>
                                                                                                    <Column header="Item" >
                                                                                                        <template #body="slotProps">
                                                                                                            {{ slotProps.data.item }}
                                                                                                        </template>
                                                                                                    </Column>
                                                                                                    <Column header="Vehicle">
                                                                                                        <template #body="slotProps">
                                                                                                            {{ slotProps.data.vehicle }}
                                                                                                        </template>
                                                                                                    </Column>
                                                                                                    <Column header="Vehicle Type">
                                                                                                        <template #body="slotProps">
                                                                                                            {{ slotProps.data.vehicle_type }}
                                                                                                        </template>
                                                                                                    </Column>
                                                                                                    <Column field="quantity" header="Quantity" :style="{ width: '9vw' }"></Column>
                                                                                                    <Column field="rate" header="Rate $ " :style="{ width: '9vw' }">
                                                                                                        </Column>
                                                                                                    <Column field="amount" header="Amount $" :style="{ width: '9vw' }"></Column>
                                                                                                    <Column header="Actions" :style="{ width: '3vw' }">
                                                                                                        <template #body="slotProps">
                                                                                                            <Button @click="openModal(slotProps.index)" label="Edit"  class="small" :style="{ width: '7vw' }"/>
                                                                                                        </template>
                                                                                                    </Column>
                                                                                                    <Column field="chargeable_mileage" hidden="true"></Column>
                                                                                                    <Column field="opening_mileage" hidden="true"></Column>
                                                                                                    <Column field="closing_mileage" hidden="true"></Column>
                                                                                                    <Column field="actual_mileage" hidden="true"></Column>
                                                                                                    <Column field="total_free_mileage" hidden="true"></Column>
                                                                                                    <Column field="uom" hidden="true"></Column>
                                                                                                    <Column field="date_outgoing" hidden="true"></Column>
                                                                                                    <Column field="date_incoming" hidden="true"></Column>
                                                                                                    <Column field="duration" hidden="true"></Column>
                                                                                                </DataTable>
                                                                                                
                                                                                            </div>
                                                                                        </div>
                                                                                            <div style="padding-left: 13px;">
                                                                                            <Button label="Add Item" icon="pi pi-plus" size="normal"   @click="addDialog = true" />
                                                                                            </div>
                                                                                            <Dialog v-model:visible="addDialog" modal header="Add Item" :style="{ width: '50vw' }">
                                                                                                <div class="grid formgrid p-fluid">
                                                                                               <div class="field mb-4 col-12 md:col-6"> 
                                                                                                    <label for="company_name" class="font-medium text-900">Item</label> 
                                                                                                    <DropDown v-model="selectedItem" :options="itemsNames"  placeholder="Choose Item" class="w-full md:w-34rem" />
                                                                                                </div>

                                                                                                <div class="field mb-4 col-12 md:col-6"> 
                                                                                                    <label for="company_name" class="font-medium text-900">Vehicle</label> 
                                                                                                    <DropDown v-model="selectedVehicle" :options="vehicles"  placeholder="Choose Vehicle" class="w-full md:w-34rem" />
                                                                                                </div>
                                                                                                </div>
                                                                                                <Button on @click="addItem" label="Add" icon="pi pi-plus" />
                                                                                            </Dialog>

                                                                                            <Dialog v-model:visible="editDialog" modal header="Edit Item" :style="{ width: '50vw' }">
                                                                                                <div class="grid formgrid p-fluid">
                                                                                               <div class="field mb-4 col-12 md:col-6"> 
                                                                                                    <label for="company_name" class="font-medium text-900">Opening Mileage</label> 
                                                                                                    <input class="p-inputtext p-component" data-pc-name="inputtext" v-model="opening_mileage" data-pc-section="root" id="customer_name" type="text">
                                                                                                </div>

                                                                                                <div class="field mb-4 col-12 md:col-6"> 
                                                                                                    <label for="company_name" class="font-medium text-900">Date Outgoing</label> 
                                                                                                    <Calendar v-model="date_outgoing" showIcon />
                                                                                                </div>

                                                                                                <div class="field mb-4 col-12 md:col-6"> 
                                                                                                    <label for="company_name" class="font-medium text-900">Closing Mileage</label> 
                                                                                                    <input class="p-inputtext p-component" data-pc-name="inputtext" v-model="closing_mileage" data-pc-section="root" id="customer_name" type="text">
                                                                                                </div>

                                                                                                <div class="field mb-4 col-12 md:col-6"> 
                                                                                                    <label for="company_name" class="font-medium text-900">Date Incoming</label> 
                                                                                                    <Calendar v-model="date_incoming" showIcon />
                                                                                                </div>

                                                                                                <div class="field mb-4 col-12 md:col-6"> 
                                                                                                    <label for="company_name" class="font-medium text-900">Actual Mileage</label> 
                                                                                                    <input class="p-inputtext p-component" data-pc-name="inputtext" v-model="actual_milege" data-pc-section="root" id="customer_name" type="text">
                                                                                                </div>

                                                                                                <div class="field mb-4 col-12 md:col-6"> 
                                                                                                    <label for="company_name" class="font-medium text-900">Duration</label> 
                                                                                                    <input class="p-inputtext p-component" data-pc-name="inputtext" v-model="duration" data-pc-section="root" id="customer_name" type="text">
                                                                                                </div>

                                                                                                <div class="field mb-4 col-12 md:col-6"> 
                                                                                                    <label for="company_name" class="font-medium text-900">Total Free Mileage</label> 
                                                                                                    <input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="customer_name" type="text">
                                                                                                </div>

                                                                                                <div class="field mb-4 col-12 md:col-6"> 
                                                                                                    <label for="company_name" class="font-medium text-900">Confirmed Quantity</label> 
                                                                                                    <input class="p-inputtext p-component" data-pc-name="inputtext" v-model="duration" data-pc-section="root" id="customer_name" type="text">
                                                                                                </div>

                                                                                                <div class="field mb-4 col-12 md:col-6"> 
                                                                                                    <label for="company_name" class="font-medium text-900">Chargeable Mileage</label> 
                                                                                                    <input class="p-inputtext p-component" data-pc-name="inputtext" v-model="chargeable" data-pc-section="root" id="customer_name" type="text">
                                                                                                </div>

                                                                                                <div class="field mb-4 col-12 md:col-6"> 
                                                                                                    <label for="company_name" class="font-medium text-900">Rate</label> 
                                                                                                    <input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" v-model="rate" id="rate" type="text">
                                                                                                </div>

                                                                                                <!-- <div class="field mb-4 col-12 md:col-6"> 
                                                                                                    <label for="company_name" class="font-medium text-900">Unit of Measure</label> 
                                                                                                    <input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" v-model="uom" id="customer_name" type="text">
                                                                                                </div> -->

                                                                                                <div class="field mb-4 col-12 md:col-6"> 
                                                                                                    <label for="company_name" class="font-medium text-900">Choose Tax Rate</label> 
                                                                                                    <DropDown v-model="selectedTax" :options="taxes"  placeholder="Select Tax" class="w-full md:w-34rem" />
                                                                                                </div>
                                                                                                <div class="field mb-4 col-12 md:col-6"> 
                                                                                                    <label for="company_name" class="font-medium text-900">Taxable?</label> 
                                                                                                  
                                                                                                    <Checkbox v-model="is_taxable" :binary="true" />
                                                                                                    
                                                                                                </div>
                                                                                                <div class="field mb-4 col-12 md:col-6"> 
                                                                                                    <label for="company_name" class="font-medium text-900">Number of Vehicles</label> 
                                                                                                    <input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" v-model="number" id="rate" type="text">
                                                                                                </div>

                                                                                              

                                                                                                

                                                                                                </div>
                            
                                                                                                <Button label="Save" @click="(e) => editItem()" icon="pi pi-plus" />
                                                                                                
                                                                                            </Dialog>

                                                                                            <div class="field mb-4 col-12 flex align-items-center">
                                                                                                <div class="p-checkbox p-component" data-pc-name="checkbox" data-pc-section="root">
                                                                                                  </div>
                                                                                                   
                                                                                                    </div>
                                                                                                        <div class="surface-border border-top-1 opacity-50 mb-4 col-12">

                                                                                                        </div>
                                                                                                            <div class="field mb-4 col-12"><label for="notes" class="font-medium text-900">Terms and Conditions</label>
                                          
                                                                                                                <DropDown v-model="selectedTerm" :options="terms"  placeholder="Choose Terms and Conditions" style="height: calc(133.6px); overflow: hidden;" class="w-full md:w-34rem" />
                                                                                                            </div>
                                                                                                                <div class="surface-border border-top-1 opacity-50 mb-4 col-12">

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
    import { useToast } from "primevue/usetoast";
    import { useItemStore } from '~/stores/items';
    import { useBankStore } from '~/stores/banking_details';
    import { useCostStore } from '~/stores/cost_center';
    import { useCurrencyStore } from '~/stores/currency';
    import { useCustomerStore } from '~/stores/customers';
    import { useSeriesStore } from '~/stores/series';
    import { useTermStore } from '~/stores/term';
    import { useQuotationStore } from '~/stores/quotation';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from "axios";

    const router = useRouter();
    const quotationStore = useQuotationStore();
    const toast = useToast();
    const itemStore = useItemStore();
    const bankStore = useBankStore();
    const costStore = useCostStore();
    const currencyStore = useCurrencyStore();
    const customerStore = useCustomerStore();
    const seriesStore = useSeriesStore();
    const termStore = useTermStore();
   
    //Sales Invoice data
    let selectedCustomer = storeToRefs(quotationStore).selectedCustomer;
    let selectedCurrency = storeToRefs(quotationStore).currency;
    let selectedSeries = storeToRefs(quotationStore).series;
    let selectedAccount = storeToRefs(quotationStore).selectedAccount;
    let selectedTerm = storeToRefs(quotationStore).selectedTerm;
    const invoiceName = storeToRefs(quotationStore).name;
    let selectedCost = storeToRefs(quotationStore).cost_centre;
    let selectedItem = ref()
    let selectedVehicle = storeToRefs(quotationStore).selectedVehicle;
    let vehicleType = ref();
    let selectedTax = ref();
    const taxes = ref([14.5, 15]);
    const date = storeToRefs(quotationStore).date;
    const posting_date = storeToRefs(quotationStore).posting_date;
    const valid_until = storeToRefs(quotationStore).valid_until;

    const date_incoming = storeToRefs(quotationStore).date_incoming;
    const date_outgoing = storeToRefs(quotationStore).date_outgoing;
    const opening_mileage = storeToRefs(quotationStore).opening_mileage;
    const closing_mileage = storeToRefs(quotationStore).closing_mileage;
    const actual_milege = ref(0);
    const total_free_mileage = storeToRefs(quotationStore).total_free_mileage;
    const chargeable_mileage = ref(0);
    const duration =  ref(0);
    const rate = ref(0);
    const symbol = ref();
    const itemsTable = ref([]);
    const cost_excluding_vat = storeToRefs(quotationStore).cost_excluding_vat;
    const cost_including_vat = storeToRefs(quotationStore).cost_including_vat;
    const non_taxable_amount = storeToRefs(quotationStore).non_taxable_amount;
    const total_costs= storeToRefs(quotationStore).total_costs;
    const amount_due = storeToRefs(quotationStore).amount_due;
    const vat = storeToRefs(quotationStore).vat
    const itemList = storeToRefs(quotationStore).items;
    const uom = storeToRefs(quotationStore).uom;
    const is_taxable = ref(false);
    const term = storeToRefs(termStore).term;                                          
    //dialog states
    const addDialog = ref(false);
    const editDialog = ref(false);
    const addTerm = ref(false);

    let customers = ref([]);
    let currencies = ref([]);
    
    let series = ref([]);
    let cost_centers = ref([]);
    let accounts = ref([]);
    let items = ref([]);
    let termList = ref([]);

    const printPreview = () => {
        retrieveItemData();
        const invoiceData = {
            selectedCustomer: selectedCustomer.value,
            selectedSeries: selectedSeries.value,
            selectedAccount: selectedAccount.value,
            date: date.value,
            name: invoiceName.value,
            vat: vat.value,
            cost_excluding_vat: cost_excluding_vat.value,
            non_taxable_amount: non_taxable_amount.value,
            total_costs: total_costs.value,
            cost_including_vat: cost_including_vat.value,
            items: itemList.value,
            terms: selectedTerm.value

        };

        router.push({
        path: '/quotation/print_preview',
        query: {
        invoiceData: JSON.stringify(invoiceData)
     }
    });
    };

    const loadData = async () => {
        await itemStore.getItems();
        await bankStore.getBanks();
        await costStore.getCostCenters();
        await currencyStore.getCurrency(); 
        await customerStore.getCustomers();
        await seriesStore.getSeries();
        //from DB
        await itemStore.listItems();
        await bankStore.listAccounts();
        await costStore.listCostCenters();
        await currencyStore.listCurrency();
        await customerStore.listCustomers();
        await seriesStore.listSeries();
        await termStore.listTerms();

        customers.value = await customerStore.customerList.data;
        currencies.value = await currencyStore.currencyList.data;
        items.value = await itemStore.itemList.data;
        series.value = await seriesStore.series.data;
        cost_centers.value = await costStore.costList.data;
        accounts.value = await bankStore.accountsList.data;
        termList.value = await termStore.termList.data;
    
    };

    onMounted(loadData);
        
    const customerNames = computed(() => {
        return customers.value.map(data => data.customer_name);
    });

    const accountNames = computed(() => {
        return accounts.value.map(account => account.bank);
    });

  

    const formatted_cost_excluding_vat = computed(() => {
        const value = Number(cost_excluding_vat.value);
        if (isNaN(value)) {
            return null; 
        }
        return value.toFixed(2);
    });

    const formatted_vat = computed(() => {
        const value = Number(vat.value);
        if (isNaN(value)) {
            return null; 
        }
        return value.toFixed(2);
    });

    const formatted_non_taxable_amount = computed(() => {
        const value = Number(non_taxable_amount.value);
        if (isNaN(value)) {
            return null; 
        }
        return value.toFixed(2);
    });

    const formatted_total_costs = computed(() => {
        const value = Number(total_costs.value);
        if (isNaN(value)) {
            return null;
        }
        return value.toFixed(2);
    });

    const formatted_cost_including_vat = computed(() => {
        const value = Number(cost_including_vat.value);
        if (isNaN(value)) {
            return null; 
        }
        return value.toFixed(2);
    });

    const currencyNames = computed(() => {
        return currencies.value.map(currency => currency.name);
    });

    const seriesNames = computed(() => {
        return series.value.map(series => series.naming_series);
    });

    const costNames = computed(() => {
        return cost_centers.value.map(cost_center => cost_center.cost_center_name);
    });


    const addItem = () => {
        
        if (!selectedItem.value) {
        
            alert('Please choose an item');
            return;
        }

        const newItem = {
            item: selectedItem.value,
            vehicle: selectedVehicle.value,
            vehicle_type: vehicleType.value,
            quantity: 1,
            rate: 0.00.toFixed(2), 
            amount: 0.00.toFixed(2),
            chargeable_mileage: 0,
            opening_mileage: 0,
            closing_mileage: 0,
            actual_milege: 0,
            total_free_mileage: 0,
            uom: uom.value,
            date_outgoing: 0,
            date_incoming: 0,
            duration: 0
        };
   
        const getItemData = async () => {
          
          var data = JSON.stringify({
              "selectedVehicle": selectedVehicle.value,
          });

          var config = {
              method: 'post',
              url: '/item-detail/',
              headers: { 
                  'Content-Type': 'application/json'
              },
              data: data
          };

          const result: any = await axios(config).then(function (response) {
              console.log(JSON.stringify(response.data.data));
              if (response.data.data === null){
                  vehicleType.value = '';
                  uom.value = '';
              } else {
                  vehicleType.value = response.data.data.item_name;
                  uom.value = response.data.data.stock_uom;
              }
              
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
          getItemData()

        itemsTable.value.push(newItem); 
        addDialog.value = false;
        selectedItem.value = null;
        selectedVehicle.value = null;
        //calculateTotal();
        retrieveItemData();
    };

    const calculateTotal = () => {
        non_taxable_amount.value = Number(0);
        // vat.value = Number(0);
        amount_due.value = Number(0);
        total_costs.value = Number(0);
        //taxable_amount.value = Number(0);

        if (is_taxable.value === true) {
            for (const item of itemsTable.value) {
                let tax = Number((selectedTax.value / 100)) * Number(item.amount);
                vat.value += tax;
                //taxable_amount.value += Number(item.amount + tax);
                non_taxable_amount.value += Number(0);
            }
            vat.value = vat.value;
           // taxable_amount.value = taxable_amount.value;
            non_taxable_amount.value = non_taxable_amount.value;

        } else {
            for (const item of itemsTable.value) {
               // taxable_amount.value += Number(0);
                non_taxable_amount.value += Number(item.amount);
            }
            vat.value = vat.value;
           // taxable_amount.value = taxable_amount.value;
            non_taxable_amount.value = non_taxable_amount.value;
        }

       // total_charges.value = Number(non_taxable_amount.value + taxable_amount.value + vat.value);
       // amount_due.value = Number(total_charges.value - advance_payment.value);
    }

    const itemData = ref([]);
    const retrieveItemData = () =>  {
        itemData.value = itemsTable.value.map(item => {
            const data = {
            item: item.item,
            vehicle: item.vehicle, 
            quantity: item.quantity,
            rate: item.rate,
            amount: item.amount,
            vehicle_type: item.vehicle_type,
            chargeable_mileage: item.chargeable_mileage,
            opening_mileage: item.opening_mileage,
            closing_mileage: item.closing_mileage,
            actual_milege: item.actual_milege,
            total_free_mileage: item.total_free_mileage,
            uom: item.uom,
            date_outgoing: item.date_outgoing,
            date_incoming: item.date_incoming,
            duration: item.duration

            };
            
            return data;
        });
        console.log("my items are here", itemData.value);
        itemList.value = itemData.value;
        //console.log(itemList.value);
    }
    const index = ref(null); 

    const editItem = () => {
        console.log(is_taxable.value);
        console.log(index.value);
        console.log(itemsTable.value);
        const item = itemsTable.value[index.value];

        if (item) {
            item.rate = rate.value;
            item.chargeable_mileage = ini.value;
            item.opening_mileage = opening_mileage.value;
            item.closing_mileage = closing_mileage.value;
            item.actual_mileage = actual_milege.value;
            item.total_free_mileage = total_free_mileage.value;
            item.uom = uom.value;
            item.date_incoming = date_incoming.value;
            item.date_outgoing = date_outgoing.value;
            item.duration = duration.value;
            if (Number.isNaN(duration.value)){
                item.quantity = 1;
            } else {
                item.quantity = duration.value;
            }
            item.amount = rate.value * item.quantity;
        }

        editDialog.value = false;
        rate.value = null;
        ini.value = null;
        opening_mileage.value = null;
        closing_mileage.value = null;
        actual_milege.value = null;
        total_free_mileage.value = null;
        uom.value = null;
        date_incoming.value = null;
        date_outgoing.value = null;
        duration.value = null;
        selectedTax.value = null;
        is_taxable.value = false;    
    };

    const openModal = (myIndex) => {
        index.value = myIndex;
        const item = itemsTable.value[index.value];
        duration.value = item.duration;
        ini.value = item.chargeable_mileage;
        opening_mileage.value = item.opening_mileage;
        closing_mileage.value = item.closing_mileage;
        actual_milege.value = item.actual_mileage;
        total_free_mileage.value = item.total_free_mileage;
        rate.value = item.rate;
        date_incoming.value = item.date_incoming;
        date_outgoing.value = item.date_outgoing;
        editDialog.value = true
        //console.log("my index", myIndex)
    }

    const getCurrencySymbol = async () => {
          
          var data = JSON.stringify({
              "selectedCurrency": selectedCurrency.value,
          });

          var config = {
              method: 'post',
              url: '/currency-detail/',
              headers: { 
                  'Content-Type': 'application/json'
              },
              data: data
          };

          const result: any = await axios(config).then(function (response) {
              console.log(JSON.stringify(response.data.data));
              
                  symbol.value = response.data.data.symbol;
                 console.log(symbol.value);
              
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

    watchEffect(() => {
        getCurrencySymbol();
    });

    watchEffect(() => {
        calculateTotal();
    });

    const generateName = async () => {
          
          var data = JSON.stringify({
              "selectedSeries": selectedSeries.value,
          });

          var config = {
              method: 'post',
              url: '/quotation/get-name/',
              headers: { 
                  'Content-Type': 'application/json'
              },
              data: data
          };

          const result: any = await axios(config).then(function (response) {
   
                invoiceName.value = response.data.name;
                 //console.log("The name is ", invoiceName.value);
              
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

    watchEffect(() => {
        generateName();
    });

    const calculateDuration = () => {
        const incoming = new Date(date_incoming.value);
        const outgoing = new Date(date_outgoing.value);
        const diffTime = Math.abs(incoming.getTime() - outgoing.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        duration.value = diffDays;
    }; 

    watchEffect(() => {
        calculateDuration();
    });

    
    const calculateActualMileage = () => {
        const opening = Number(opening_mileage.value);
        const closing = Number(closing_mileage.value);
        const actual = closing - opening;
        actual_milege.value = actual;
    }; 

    watchEffect(() => {
        calculateActualMileage();
    });

    const chargeable = ref(0);
    const ini = ref(0);

    watchEffect(() => {
       // calculateChargeableMileage();
       chargeable.value =  Number(actual_milege.value) - Number(total_free_mileage.value);
    });

    watchEffect(() => {
        ini.value = chargeable.value
    });
   
    const itemsNames = computed(() => {
        
        return items.value.map(item => item.item_name);
    });
    
    const vehicles = computed(() => {
   
        return items.value.map(item => item.item_code);
    });

    const terms = computed(() => {
   
        return termList.value.map(term => term.term);
    });


    const createInvoice = async () => {
        retrieveItemData();
        if (!selectedCustomer.value) {
            toast.add({
            severity: 'warn',
            summary: 'Create Quotation',
            detail: 'No customer selected. Please select a customer.',
            life: 2500
            });
            return;
        }

        if (!selectedCost.value) {
            toast.add({
            severity: 'warn',
            summary: 'Quotation',
            detail: 'No cost center selected. Please select a cost center.',
            life: 2500
            });
            return;
        }
        console.log("Heyy my items are items are here,", itemList.value);
        let result: any = await quotationStore.createQuotation();

        if (result?.data?.success) {
            const invoiceId = result.data.data.id;

            router.push(`/quotation/detail-${invoiceId}`);
            toast.add({
            severity: 'success',
            summary: 'Create Quotation',
            detail: 'Quotation was created successfully',
            life: 6000
            });
        } else {
            toast.add({
            severity: 'warn',
            summary: 'Create Quotation',
            detail: `Quotation creation failed: ${result?.data?.message}`,
            life: 6000
            });
            console.log('error', result?.data?.error);
        }
    }

    const createTerm = async () => {
 
        let result: any = await termStore.createTerm();

        addTerm.value = false;
        term.value = null;

        if (result?.data?.success) {
    
            
            //router.push(`/sales_invoice/create`);
            toast.add({
            severity: 'success',
            summary: '',
            detail: 'Terms and conditions created successfully',
            life: 6000
            });
        } else {
            toast.add({
            severity: 'warn',
            summary: '',
            detail: `Terms creation failed: ${result?.data?.message}`,
            life: 6000
            });
            console.log('error', result?.data?.error);
        }
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

  .my-table th,
  .my-table td {
    border: 1px solid black;
    padding: 8px;
    text-align: right;
  }

  .p-toast-message {
  position: fixed;
  top: 17%;
  left: 50%;
  transform: translate(-10%, -50%);
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
</style>