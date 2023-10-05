<template>
    <NuxtLayout name="dashboard">
        <section class="section" style="padding-top: 40px;">
            <div class="container-fluid">
                    <div class="block-section">
                        <div class="block-content">
                            <div class="">
                                <div class="surface-ground px-4 py-8 md:px-6 lg:px-8">
                                    <div class="text-900 font-medium text-xl mb-3">Sales Invoice</div>
                                    <div class="d-flex justify-content-end mb-3">
                                        
                                        <Button @click="printPreview" label="Print" icon="pi pi-print" />
                                        
                                        <Button on @click="createInvoice" label="Save" icon="pi pi-save" class="ml-3" />
                                    </div>
                                    <div class="surface-card p-4 shadow-2 border-round p-fluid">
                                      
                                        <div class="grid formgrid p-fluid">
                                            <div class="field mb-4 col-12 md:col-4">
                                                <label for="company_name" class="font-medium text-900">Series</label><DropDown v-model="selectedSeries" :options="seriesNames"  placeholder="Select Naming Series" class="w-full md:w-34rem" /></div>
                                                <div class="field mb-4 col-12 md:col-4">
                                                    <label for="invoice_id" class="font-medium text-900">Date</label><Calendar v-model="date" showIcon /></div>
                                                    <div class="field mb-4 col-12 md:col-4"><label for="customer_name" class="font-medium text-900">Customer</label><DropDown v-model="selectedCustomer" :options="customerNames"  placeholder="Select Customer" class="w-full md:w-34rem" /> </div>
                                                    <div class="field mb-4 col-12 md:col-4"><label for="customer_name" class="font-medium text-900">Posting Time</label><Calendar v-model="date" showIcon /></div>
                                                    <div class="field mb-4 col-12 md:col-4"><label for="customer_name" class="font-medium text-900">Destination</label><input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="customer_name" type="text"></div>
                                                    <div class="field mb-4 col-12 md:col-4"><label for="customer_name" class="font-medium text-900">Payment Due Date</label><Calendar v-model="date" showIcon /></div>
                                                    <div class="field mb-4 col-12 md:col-4"><label for="customer_name" class="font-medium text-900">Banking Details</label><DropDown v-model="selectedAccount" :options="accountNames"  placeholder="Select Bank Account" class="w-full md:w-34rem" /></div>
                                                    <div class="field mb-4 col-12 md:col-4"><label for="customer_email" class="font-medium text-900">Cost Center</label><DropDown v-model="selectedCost" :options="costNames"  placeholder="Select Cost Center" class="w-full md:w-34rem" /></div>
                                                    <div class="field mb-4 col-12 md:col-4"></div>
                                                        <div class="field mb-4 col-12 md:col-4"></div>
                                                                <div class="surface-border border-top-1 opacity-50 mb-4 col-12">
                                                                </div>
                                                                <div class="field mb-4 col-6 md:col-3"><label for="quantity" class="font-medium text-900">Currency</label><DropDown v-model="selectedCurrency" :options="currencyNames"  placeholder="Select Currency" class="w-full md:w-34rem" /></div><div class="field mb-4 col-6 md:col-3"><div class="flex align-content-center">
                                                                        </div></div><div class="field mb-4 col-12 md:col-6"></div>
                                                                            <div class="block-header">
                                                                                        <div style="padding-left: 13px;"><h4>Items</h4></div>
                                                                                        </div>
                                                                                    <div class="field mb-4 col-12 flex align-items-center">
                                                                                            <div class="table-wrapper">
                                                                                                <DataTable :value="itemsTable"  resizableColumns columnResizeMode="expand" showGridlines class="full-width-table">
                                                                                                    <Column field="item" header="Item"></Column>
                                                                                                    <Column field="quantity" header="Quantity"></Column>
                                                                                                    <Column field="rate" header="Rate"></Column>
                                                                                                    <Column field="amount" header="Amount"></Column>
                                                                                                    <Column header="Actions" :style="{ width: '3vw' }">
                                                                                                        <template #body="rowData">
                                                                                                            <Button @click="editDialog = true" label="Edit"  class="small" :style="{ width: '7vw' }"/>
                                                                                                        </template>
                                                                                                    </Column>
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
                                                                                                    <DropDown v-model="selectedCurrency" :options="currencyNames"  placeholder="Choose Vehicle" class="w-full md:w-34rem" />
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
                                                                                                    <input class="p-inputtext p-component" data-pc-name="inputtext" v-model="chargeable_mileage" data-pc-section="root" id="customer_name" type="text">
                                                                                                </div>

                                                                                                <div class="field mb-4 col-12 md:col-6"> 
                                                                                                    <label for="company_name" class="font-medium text-900">Rate</label> 
                                                                                                    <input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" v-model="rate" id="customer_name" type="text">
                                                                                                </div>

                                                                                                <div class="field mb-4 col-12 md:col-6"> 
                                                                                                    <label for="company_name" class="font-medium text-900">Unit of Measure</label> 
                                                                                                    <input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" v-model="uom" id="customer_name" type="text">
                                                                                                </div>
                                                                                                </div>
                                                                                                <Button label="Save" @click="editItem(itemsTable?.id)" icon="pi pi-plus" />
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
    import { useInvoiceStore } from '~/stores/sales_invoice';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const invoiceStore = useInvoiceStore();
    const toast = useToast();
    const itemStore = useItemStore();
    const bankStore = useBankStore();
    const costStore = useCostStore();
    const currencyStore = useCurrencyStore();
    const customerStore = useCustomerStore();
    const seriesStore = useSeriesStore();
   
    //Sales Invoice data
    let selectedCustomer = storeToRefs(invoiceStore).selectedCustomer;
    let selectedCurrency = storeToRefs(invoiceStore).currency;
    let selectedSeries = storeToRefs(invoiceStore).series;
    let selectedAccount = storeToRefs(invoiceStore).selectedAccount;
    let selectedCost = storeToRefs(invoiceStore).cost_centre;
    let selectedItem = ref('')
    
    let selectedVehicle = storeToRefs(invoiceStore).selectedVehicle;
    const date = storeToRefs(invoiceStore).date;
    const date_incoming = storeToRefs(invoiceStore).date_incoming;
    const date_outgoing = storeToRefs(invoiceStore).date_outgoing;
    const opening_mileage = storeToRefs(invoiceStore).opening_mileage;
    const closing_mileage = storeToRefs(invoiceStore).closing_mileage;
    const actual_milege = ref(0);
    const total_free_mileage = storeToRefs(invoiceStore).total_free_mileage;
    const chargeable_mileage = ref(0);
    const duration =  ref(0);
    const rate = storeToRefs(invoiceStore).rate;
    const uom = storeToRefs(invoiceStore).uom;

    //dialog states
    const addDialog = ref(false);
    const editDialog = ref(false);

    let customers = ref([]);
    let currencies = ref([]);
    
    let series = ref([]);
    let cost_centers = ref([]);
    let accounts = ref([]);
    let items = ref([]);
    const itemsTable = ref([]);
    //const { items } = storeToRefs(itemStore)

    const printPreview = () => {
        const invoiceData = {
            selectedCustomer: selectedCustomer.value,
            selectedSeries: selectedSeries.value,
            selectedAccount: selectedAccount.value,
            date: date.value,

        };

        router.push({
        path: '/sales_invoice/print_preview',
        query: {
        invoiceData: JSON.stringify(invoiceData)
     }
    });
    };

    const loadData = async () => {
        // await itemStore.getItems();
        // await bankStore.getBanks();
        // await costStore.getCostCenters();
        // await currencyStore.getCurrency(); 
        // await customerStore.getCustomers();
        // await seriesStore.getSeries();
        //from DB
        await itemStore.listItems();
        await bankStore.listAccounts();
        await costStore.listCostCenters();
        await currencyStore.listCurrency();
        await customerStore.listCustomers();
        await seriesStore.listSeries();

        customers.value = await customerStore.customerList.data;
        currencies.value = await currencyStore.currencyList.data;
        items.value = await itemStore.itemList.data;
        series.value = await seriesStore.series.data;
        cost_centers.value = await costStore.costList.data;
        accounts.value = await bankStore.accountsList.data;
    
    };

    onMounted(loadData);
        
    const customerNames = computed(() => {
        return customers.value.map(data => data.customer_name);
    });

    const accountNames = computed(() => {
        return accounts.value.map(account => account.bank);
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
            const newItem = {
            item: selectedItem,
            quantity: 1,
            rate: '', 
            amount: 0 
        };
        
        itemsTable.value.push(newItem); 
    };
            const editItem = (itemId) => {
        const index = itemsTable.value.findIndex(item => item.id === itemId);

        if (index !== -1) {
            itemsTable.value.splice(index, 1, {
            ...itemsTable.value[index],
            rate,
            });
        }

        editDialog.value = false;
        };

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


    const calculateChargeableMileage = () => {
        const total_free = Number(total_free_mileage.value);
        const actual = Number(actual_milege.value);
        const chargeable = actual - total_free;
        chargeable_mileage.value = chargeable;
    }; 

    watchEffect(() => {
        calculateChargeableMileage();
    });
   
    const itemsNames = computed(() => {
        console.log(items.value);
        return items.value.map(item => item.item_name);
    });

    // const createInvoice = async () => {
    //     let data = {
    //         name: "Invoice",
    //         number: 1,
    //         currency: selectedCurrency.value,
    //         series: selectedSeries.value,
    //         date: date.value,
    //         customer: selectedCustomer.value,
    //         bank: selectedAccount.value,
    //         cost_center: selectedCost.value
    //     }
    //     let result = await invoiceStore.create(data)
    //     if (result.data.success) {
            
    //         toast.add({severity:'success', summary: 'Success', detail:'Invoice Succesfully Created', life: 3000});
    //     }
    //     else {
    //         toast.add({severity:'warn', summary: 'Failed', detail:'Creation Failed', life: 3000});
    //     }
    // }

    const createInvoice = async () => {
        let result: any = await invoiceStore.createInvoice();
        if(result?.data?.success){
            toast.add({severity: 'success', summary: 'Create Member', detail: "Member was created successfully", life: 6000});
        
        }else{
            toast.add({severity: 'warn', summary: 'Create Member', detail: `Member creation failed : ${result?.data?.message}`, life: 6000});
            console.log("error",result?.data?.error);
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