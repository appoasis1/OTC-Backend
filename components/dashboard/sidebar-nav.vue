<template>
  <div>
    <aside class="sidebar-nav-wrapper">
      <div @click="goToHome()" class="navbar-logo">
        <img width="180" src="/images/" alt="Rapiso" style="margin-top: 10%; margin-bottom: 5px;">
      </div>
      <nav  class="sidebar-nav">
        <PanelMenu :model="admin_menus" />
        <!-- <PanelMenu v-if="role === 'HR_OFFICER'" :model="officer_menus" />
        <PanelMenu v-if="role === 'HR_DIRECTOR'" :model="approval_menus"/>
        <PanelMenu v-if="role === 'HR_MANAGER'" :model="approval_menus"/>
        <PanelMenu v-if="role === 'FINANCE'" :model="approval_menus"/> -->
      </nav>
      <div class="promo-box">
        <h3>OACEY</h3>
        <p>{{currentYear()}}</p>
      </div>
    </aside>
    <div class="overlay"></div>
  </div>
</template>

<script setup lang="ts">
    import moment from 'moment';
    import { useToast } from "primevue/usetoast";
  
    import {FilterMatchMode,FilterOperator} from 'primevue/api';
    import { storeToRefs } from "pinia";

    const toast:any = useToast();
    
   

    const first_name = ref<string>();
    const last_name = ref<string>();
    const role = ref<string>();
    

  const goToHome =async () => {

    navigateTo('/')
    
  }

  const currentYear = () => {

    let current_year = moment().year()
    return current_year
  }
 


  const admin_menus = ref([
            {
                key: '1',
                label: 'Member Onboarding',
                icon: 'pi pi-fw pi-cog',
                items: [{
                        key: '1_0',
                        label: 'Register Members',
                        icon: 'pi pi-fw pi-user-plus',
                        to: '/members/create'
                    },
                    {
                        key: '1_1',
                        label: 'Members List',
                        icon: 'pi pi-fw pi-arrows-h',
                        to: '/members/list'
                    }
                ]
            },
           
        ]);


</script>

<style>
  .p-datepicker.p-component {
    width: 350px;
    height: 450px; 
  }

  .sidebar-nav-wrapper {
    overflow: hidden !important;
  }
  nav.sidebar-nav {
    margin: 5px;
  }
  .p-panelmenu .p-panelmenu-header .p-panelmenu-header-content .p-panelmenu-header-action {
    padding: 1.25rem;
    font-weight: 500;
    font-size: 14px;
    color: black;
 }
</style>