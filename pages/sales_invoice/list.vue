<template>
    <NuxtLayout name="dashboard">
        <section class="section" style="padding-top: 40px;">
            <div class="container-fluid">
               
                        <div>
                            <div class="card-style">
                                <div>
                                    <nuxt-link to="/sales_invoice/create" class="btn btn-primary mb-3">
                                        <i class="pi pi-plus"></i> New Invoice
                                    </nuxt-link>
                                </div>
                                    <DataTable :value="invoices" lazy paginator :first="0" :rows="10" v-model:filters="filters" ref="dt" dataKey="id"
                                          filterDisplay="row"
                                        :globalFilterFields="['name','country.name', 'company', 'representative.name']"
                                         @row-select="onRowSelect" @row-unselect="onRowUnselect" tableStyle="min-width: 75rem">
                                        <Column selectionMode="multiple" headerStyle="width: 3rem">
                                        </Column>
                                        <Column field="name" header="Title" filterMatchMode="startsWith" sortable>
                                                <!-- <template #filter="{filterModel,filterCallback}">
                                                    <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter" placeholder="Search"/>
                                                </template> -->
                                        </Column>
                                        <Column field="country.name" header="Date" filterField="country.name" filterMatchMode="contains" sortable>
                                           
                                        </Column>
                                        <Column field="company" header="Cost Center" filterMatchMode="contains" sortable>
                                      
                                        </Column>
                                        <Column field="representative.name" header="Grand Total" filterField="representative.name" sortable>
                                          
                                        </Column>
                                    </DataTable>
                                </div>
                            </div>
                </div>
        </section>
    </NuxtLayout>
</template>

<script setup lang="ts">
    import { storeToRefs } from "pinia";
    import { ref, onMounted } from 'vue';
    import { useInvoiceStore } from '~/stores/sales_invoice';

    const invoiceStore = useInvoiceStore();
    let invoices =ref([]);

    const loadData = async () => {
        
    };

                        onMounted(async () => {
                            invoices.value = await invoiceStore.listInvoice.data;
                            console.log(invoices.value)
                    
                    });


const dt = ref();
const filters = ref({
    'name': {value: '', matchMode: 'contains'},
    'country.name': {value: '', matchMode: 'contains'},
    'company': {value: '', matchMode: 'contains'},
    'representative.name': {value: '', matchMode: 'contains'},
});






   
</script>

<style>
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