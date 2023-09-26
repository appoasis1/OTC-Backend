<template>
    <NuxtLayout name="dashboard">
        <section class="section">
            <div class="container-fluid">
                    <div class="block-section"><div class="block-header">

                    </div>
                        <div class="block-content">
                            <div class="">
                                <div class="surface-ground px-4 py-8 md:px-6 lg:px-8">
                                    <div class="text-900 font-medium text-xl mb-3">Sales Invoice</div>
                                    <div class="surface-card p-4 shadow-2 border-round p-fluid">
                                        <div class="grid formgrid p-fluid">
                                            <div class="field mb-4 col-12 md:col-4">
                                                <label for="company_name" class="font-medium text-900">Series</label><input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="company_name" type="text"></div>
                                                <div class="field mb-4 col-12 md:col-4">
                                                    <label for="invoice_id" class="font-medium text-900">Date</label><input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="invoice_id" type="text"></div>
                                                    <div class="field mb-4 col-12 md:col-4"><label for="customer_name" class="font-medium text-900">Customer</label><input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="invoice_id" type="text"></div>
                                                    <div class="field mb-4 col-12 md:col-4"><label for="customer_name" class="font-medium text-900">Posting Time</label><input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="customer_name" type="text"></div>
                                                    <div class="field mb-4 col-12 md:col-4"><label for="customer_name" class="font-medium text-900">Destination</label><input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="customer_name" type="text"></div>
                                                    <div class="field mb-4 col-12 md:col-4"><label for="customer_name" class="font-medium text-900">Payment Due Date</label><input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="customer_name" type="text"></div>
                                                    <div class="field mb-4 col-12 md:col-4"><label for="customer_name" class="font-medium text-900">Banking Details</label><input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="customer_name" type="text"></div>
                                                    <div class="field mb-4 col-12 md:col-4"><label for="customer_email" class="font-medium text-900">Cost Center</label><input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="quantity" type="text"></div>
                                                    <div class="field mb-4 col-12 md:col-4"></div>
                                                        <div class="field mb-4 col-12 md:col-4">

                                                        </div>
                                                                <div class="surface-border border-top-1 opacity-50 mb-4 col-12"></div><div class="field mb-4 col-6 md:col-3"><label for="quantity" class="font-medium text-900">Currency</label><input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="quantity" type="text"></div><div class="field mb-4 col-6 md:col-3"><div class="flex align-content-center">
                                                                        </div></div><div class="field mb-4 col-12 md:col-6">
                                                                        </div>
                                                                        
                                                                                        <div class="field mb-4 col-12 flex align-items-center">
                                                                                            <DataTable :value="items" resizableColumns columnResizeMode="expand" showGridlines tableStyle="min-width: 50rem">
                                                                                                <Column field="code" header="Code"></Column>
                                                                                                <Column field="name" header="Name"></Column>
                                                                                                <Column field="category" header="Category"></Column>
                                                                                                <Column field="quantity" header="Quantity"></Column>
                                                                                            </DataTable>
                                                                                        </div>
                                                                                            <div class="field mb-4 col-12 flex align-items-center">
                                                                                                <div class="p-checkbox p-component" data-pc-name="checkbox" data-pc-section="root">
                                                                                                    <div class="p-hidden-accessible" data-pc-section="hiddeninputwrapper" data-p-hidden-accessible="true"><input type="checkbox" data-pc-section="hiddeninput"></div><div class="p-checkbox-box" data-pc-section="input" data-p-highlight="false" data-p-disabled="false" data-p-focused="false"><!----></div></div>
                                                                                                    <span class="ml-2 text-900">Taxable (VAT 18%)</span>
                                                                                                    </div>
                                                                                                        <div class="surface-border border-top-1 opacity-50 mb-4 col-12">

                                                                                                        </div>
                                                                                                            <div class="field mb-4 col-12"><label for="notes" class="font-medium text-900">Notes</label>
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
                             </div><!---->
                         </div>
                    </div>
                </div>
        </section>
    </NuxtLayout>
</template>

<script setup lang="ts">
    import { storeToRefs } from "pinia";
    import { useToast } from "primevue/usetoast";
    import Swal from "sweetalert2";
    import { useItemStore } from '~/stores/items';
    

    const toast = useToast();
    const itemStore = useItemStore();

    // const name = storeToRefs(memberStore).name;
    // const surname = storeToRefs(memberStore).surname;
    // const email = storeToRefs(memberStore).email;
    // const national_id = storeToRefs(memberStore).national_id;
    // const date_of_birth = storeToRefs(memberStore).date_of_birth;
    // const sex = storeToRefs(memberStore).sex;
    // const phone = storeToRefs(memberStore).phone;
    // const home_address = storeToRefs(memberStore).home_address
    
    const clearModal = () => {
        
        // name.value = null;
        // surname.value = null;
        // email.value = null;
        // national_id.value = null;
        // sex.value = null;
        // phone.value = null;
        // home_address.value = null;
        // date_of_birth.value = null;
     }
     const loadItems = async () => {
        await itemStore.getItems();
    };

    onMounted(loadItems);

    const createInvoice = async () => {
        
        let result: any = await useItemStore.create();

        if(result?.data?.success){
            
            toast.add({severity: 'success', summary: 'Create Member', detail: "Member was created successfully", life: 6000});
            clearModal();
        }else{
           
            toast.add({severity: 'warn', summary: 'Create Member', detail: `Member creation failed : ${result?.data?.message}`, life: 6000});
            console.log("error",result?.data?.error);
        }
    }

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