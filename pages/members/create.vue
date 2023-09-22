<template>
    <NuxtLayout name="dashboard">
        <section class="section">
            <div class="container-fluid">
                <div class="title-wrapper pt-30">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                        <div class="title mb-30">
                            <h2 class="animate__animated animate__fadeIn animate__delay-1s">Add New Member</h2>
                        </div>
                        </div>
                        <!-- end col -->
                        <div class="col-md-6">
                            <div class="breadcrumb-wrapper mb-30">
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                   
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        <!-- end col -->
                    </div> 
                <!-- end row -->
                </div>
                <div class="card-style">
                    <div class="block">
                        <div class="field row">
                            <div class="col-md-6">
                                <label for="name">Name</label>
                                <span class="p-input-icon-right">
                                    <InputText id="name" v-model="name" type="text"  class="p-inputtext-lg" />
                                </span>
                                <small id="name-help"></small>
                            </div>
                            <div class="col-md-6">
                                <label for="surname">Surname</label>
                                <span class="p-input-icon-right">
                                    <InputText id="surname" v-model="surname" type="text"  class="p-inputtext-lg" />
                                </span>
                                <small id="surname-help"></small>
                            </div>
                        </div>

                        <div class="field row">
                            <div class="col-md-6">
                                <label for="name">National ID Number</label>
                                <span class="p-input-icon-right">
                                    <InputText id="name" v-model="national_id" type="text"  class="p-inputtext-lg" />
                                </span>
                                <small id="name-help"></small>
                            </div>
                            <div class="col-md-6">
                                <label for="surname">Date Of Birth</label>
                                <span class="p-input-icon-right">
                                    <InputText id="surname" v-model="date_of_birth" type="date"  class="p-inputtext-lg" />
                                </span>
                                <small id="surname-help"></small>
                            </div>
                        </div>

                        <div class="field row">
                            <div class="col-md-6">
                                <label for="name">Sex</label>
                                
                                <DropDown v-model="sex" optionValue="id" optionLabel="name" :options="[{id: 'male', name: 'Male'}, {id: 'female', name: 'Female'}]" placeholder="Select Gender" />
                               
                                <small id="name-help"></small>
                            </div>
                            <div class="col-md-6">
                                <label for="surname">Phone Number</label>
                                <span class="p-input-icon-right">
                                    <InputText id="surname" v-model="phone" type="text"  class="p-inputtext-lg" />
                                </span>
                                <small id="surname-help"></small>
                            </div>
                        </div>

                        <div class="field row">
                            <div class="col-md-6">
                                <label for="name">Email Address</label>
                                <span class="p-input-icon-right">
                                    <InputText id="name" v-model="email" type="email"  class="p-inputtext-lg" />
                                </span>
                                <small id="name-help"></small>
                            </div>
                            <div class="col-md-6">
                                <label for="surname">Home Address</label>
                                <span class="p-input-icon-right">
                                    <InputText id="surname" v-model="home_address" type="text"  class="p-inputtext-lg" />
                                </span>
                                <small id="surname-help"></small>
                            </div>
                        </div>
                        
                        
                        <div class="field mt-3 row">
                    
                           
                            <div class="col-md-2 mt-4">
                                <Button label="Save" icon="pi pi-plus" class="p-button p-component p-button-secondary p-button-outlined w-auto" outlined @click="createMember" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </NuxtLayout>
</template>

<script setup lang="ts">
    import { useMemberStore } from '~/stores/members';
    import { storeToRefs } from "pinia";
    import { useToast } from "primevue/usetoast";
    import Swal from "sweetalert2";
    import Dropdown from 'primevue/dropdown';

    const toast = useToast();
    const memberStore = useMemberStore();

    const name = storeToRefs(useMemberStore).name;
    const surname = storeToRefs(useMemberStore).surname;
    const email = storeToRefs(useMemberStore).email;
    const national_id = storeToRefs(useMemberStore).national_id;
    const date_of_birth = storeToRefs(useMemberStore).date_of_birth;
    const sex = storeToRefs(useMemberStore).sex;
    const phone = storeToRefs(useMemberStore).phone;
    const home_address = storeToRefs(useMemberStore).home_address
    
    const clearModal = () => {
        name.value = null;
        surname.value = null;
        email.value = null;
        national_id.value = null;
        sex.value = null;
        phone.value = null;
        home_address.value = null;
        date_of_birth.value = null;
     }

    const createMember = async () => {
        const { success, error, message } = await memberStore.create();

        if(success){
            
            toast.add({severity: 'success', summary: 'Create Member', detail: "Member was created successfully", life: 6000});
            clearModal();
        }else{
           
            toast.add({severity: 'warn', summary: 'Create Member', detail: "Member creation failed", life: 6000});
            console.log({ error, message });
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