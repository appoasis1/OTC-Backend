<template>
    <NuxtLayout name="dashboard">
        <section class="section" style="padding-top: 40px;">
            <div class="container-fluid">
                    <div class="block-section">
                        <div class="block-content">
                            <div class="">
                                <div class="surface-ground px-4 py-8 md:px-6 lg:px-8">
                                    <div class="text-900 font-medium text-xl mb-3">Qoutation Form</div>
                                    <div class="surface-card p-4 shadow-2 border-round p-fluid">
                                        <div class="grid formgrid p-fluid">
                                            <div class="field mb-4 col-12 md:col-4">
                                                <label for="company_name" class="font-medium text-900">Series</label><DropDown v-model="selectedSeries" :options="seriesNames"  placeholder="Select Naming Series" class="w-full md:w-34rem" /></div>
                                                <div class="field mb-4 col-12 md:col-4">
                                                    <label for="invoice_id" class="font-medium text-900">Date</label><Calendar v-model="date" showIcon /></div>
                                                    <div class="field mb-4 col-12 md:col-4"><label for="customer_name" class="font-medium text-900">Customer</label><DropDown v-model="selectedCustomer" :options="customerNames"  placeholder="Select Customer" class="w-full md:w-34rem" /> </div>
                                                    <div class="field mb-4 col-12 md:col-4"><label for="customer_name" class="font-medium text-900">Order Type</label><DropDown v-model="selectedCustomer" :options="customerNames"  placeholder="Select Customer" class="w-full md:w-34rem" /> </div>
                                                  <div class="field mb-4 col-12 md:col-4"><label for="customer_name" class="font-medium text-900">Order Destination</label><input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="customer_name" type="text"></div>
                                                    <div class="field mb-4 col-12 md:col-4"><label for="customer_name" class="font-medium text-900">Qoutation Validity Period</label><Calendar v-model="date" showIcon /></div>
                                                    <!-- <div class="field mb-4 col-12 md:col-4"></div>
                                                        <div class="field mb-4 col-12 md:col-4"></div> -->
                                                                <div class="surface-border border-top-1 opacity-50 mb-4 col-12">
                                                                </div>
                                                                <div class="field mb-4 col-6 md:col-3"><label for="quantity" class="font-medium text-900">Currency</label><DropDown v-model="selectedCurrency" :options="currencyNames"  placeholder="Select Currency" class="w-full md:w-34rem" /></div><div class="field mb-4 col-6 md:col-3"><div class="flex align-content-center">
                                                                        </div></div><div class="field mb-4 col-12 md:col-6"></div>
                                                                            <div class="block-header">
                                                                                        <div style="padding-left: 13px;"><h4>Items</h4></div>
                                                                                        </div>
                                                                                    <div class="field mb-4 col-12 flex align-items-center">
                                                                                            <div class="table-wrapper">
                                                                                                <DataTable :value="items" resizableColumns columnResizeMode="expand" showGridlines class="full-width-table">
                                                                                                    <Column field="item" header="Item"></Column>
                                                                                                    <Column field="quantity" header="Quantity"></Column>
                                                                                                    <Column field="rate" header="Rate"></Column>
                                                                                                    <Column field="amount" header="Amount"></Column>
                                                                                                    <Column header="Actions" :style="{ width: '3vw' }">
                                                                                                        <template #body="rowData">
                                                                                                            <Button @click="EditItem" label="Edit"  class="small" :style="{ width: '7vw' }"/>
                                                                                                        </template>
                                                                                                    </Column>
                                                                                                </DataTable>
                                                                                            </div>
                                                                                        </div>
                                                                                            <div style="padding-left: 13px;">
                                                                                            <Button label="Add Item" icon="pi pi-plus" size="normal"   @click="visible = true" />
                                                                                            </div>
                                                                                            <Dialog v-model:visible="visible" modal header="Add Item" :style="{ width: '50vw' }">
                                                                                                <div class="grid formgrid p-fluid">
                                                                                               <div class="field mb-4 col-12 md:col-6"> 
                                                                                                    <label for="company_name" class="font-medium text-900">Item</label> 
                                                                                                    <DropDown v-model="selectedCustomer" :options="customerNames"  placeholder="Choose Item" class="w-full md:w-34rem" />
                                                                                                </div>
                                                                                                <div class="field mb-4 col-12 md:col-6"> 
                                                                                                    <label for="company_name" class="font-medium text-900">Vehicle</label> 
                                                                                                    <DropDown v-model="selectedCustomer" :options="customerNames"  placeholder="Choose Vehicle" class="w-full md:w-34rem" />
                                                                                                </div>
                                                                                                <div class="field mb-4 col-12 md:col-6"> 
                                                                                                    <label for="company_name" class="font-medium text-900">Quantity</label> 
                                                                                                    <DropDown v-model="selectedCustomer" :options="customerNames"  placeholder="Choose Vehicle" class="w-full md:w-34rem" />
                                                                                                </div>
                                                                                                </div>
                                                                                                <Button @click="addItem" label="Add" icon="pi pi-plus" />
                                                                                            </Dialog>
                                                                                            <div class="field mb-4 col-12 flex align-items-center">
                                                                                                <div class="p-checkbox p-component" data-pc-name="checkbox" data-pc-section="root">
                                                                                                  </div>
                                                                                                   
                                                                                                    </div>
                                                                                                        <div class="surface-border border-top-1 opacity-50 mb-4 col-12">

                                                                                                        </div>
                                                                                                            <div class="field mb-4 col-12"><label for="notes" class="font-medium text-900">Terms and Conditions</label>
                                                                                                                <textarea class="p-inputtextarea p-inputtext p-component p-inputtextarea-resizable" data-pc-name="textarea" data-pc-section="root" id="notes" rows="5" style="height: calc(133.6px); overflow: hidden;"></textarea>
                                                                                </div>
                                                                              <div class="surface-border border-top-1 opacity-50 mb-4 col-12">

                                                                         </div>
                                                                    </div>
                                                                <button class="p-button p-component w-auto" type="button" aria-label="Create Invoice" data-pc-name="button" data-pc-section="root" data-pd-ripple="true"><span class="p-button-icon p-button-icon-left pi pi-file" data-pc-section="icon">

                                                            </span> 
                                                        <span class="p-button-label" data-pc-section="label">Save</span><!---->
                                                     <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root">

                                                </span>
                                           </button>
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
    import { useQuotationStore } from '~/stores/qoutation';
    import { ref } from 'vue';

    const quotationStore = useQuotationStore();
    const toast = useToast();
    const itemStore = useItemStore();
    const bankStore = useBankStore();
    const costStore = useCostStore();
    const currencyStore = useCurrencyStore();
    const customerStore = useCustomerStore();
    const seriesStore = useSeriesStore();


    let selectedCustomer = storeToRefs(quotationStore).selectedCustomer;
    let selectedCurrency = storeToRefs(quotationStore).currency;
    let selectedSeries = storeToRefs(quotationStore).series;
    let selectedAccount = storeToRefs(quotationStore).selectedAccount;
    let selectedCost = storeToRefs(quotationStore).cost_centre;
    const date = storeToRefs(quotationStore).date;
    const visible = ref(false);

    let customers = ref([]);
    let currencies = ref([]);
    
    let series = ref([]);
    let cost_centers = ref([]);
    let accounts = ref([]);
    const items = ref([]);
    //const { items }= storeToRefs(itemStore)
    const loadData = async () => {
        // await itemStore.getItems();
        // await bankStore.getBanks();
        // await costStore.getCostCenters();
        // await currencyStore.getCurrency();
        // await customerStore.getCustomers();
        // await seriesStore.getSeries();
        //from DB
        await itemStore.listItems();
        // await bankStore.listAccounts();
        await costStore.listCostCenters();
        await currencyStore.listCurrency();
        await customerStore.listCustomers();
        await seriesStore.listSeries();

        customers.value = await customerStore.customerList.data;
        currencies.value = await currencyStore.currencyList.data;
       // items.value = await itemStore.listItems.data;
        series.value = await seriesStore.listSeries.data;

        // console.log(currencies.value);
        // console.log(items);
        // console.log(series.value);
        // console.log(cost_centers.value);
        // console.log(accounts.value);
    };

    onMounted(loadData);
        

    const customerNames = computed(() => {
        return customers.value.map(customer => customer.customer_name);
    });

 
    const currencyNames = computed(() => {
    return currencies.value.map(currency => currency.name);
    });

    const seriesNames = computed(() => {
    // return series.value.map(series => series.naming_series);
    });

    const costNames = computed(() => {
    // return cost_centers.value.map(cost_center => cost_center.cost_center_name);
    });

  
    const addItem = () => {
            const newItem = {
            item: selectedCustomer,
            quantity: 1,
            rate: 0, 
            amount: 0 
        };
        
        items.value.push(newItem); 
    };

    

    const createQuotation = async () => {
        // let result: any = await useItemStore.create();

        // if(result?.data?.success){
            
        //     toast.add({severity: 'success', summary: 'Create Member', detail: "Member was created successfully", life: 6000});
        //     clearModal();
        // }else{
           
        //     toast.add({severity: 'warn', summary: 'Create Member', detail: `Member creation failed : ${result?.data?.message}`, life: 6000});
        //     console.log("error",result?.data?.error);
        // }
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