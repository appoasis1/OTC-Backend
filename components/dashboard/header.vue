<template>
  <header class="header">
            <div class="bg-indigo-500 py-3 px-5 flex align-items-center justify-content-between relative lg:static" style="min-height: 100px; ">
               <a class="cursor-pointer block lg:hidden text-indigo-50 p-ripple" data-pd-ripple="true" data-pd-styleclass="true"><i class="pi pi-bars text-4xl"></i><span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span></a>
               <div class="align-items-center flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full bg-indigo-500 left-0 top-100 z-1 shadow-2 lg:shadow-none">
                  <ul class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row">
                     <li><a href="/" class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-indigo-100 hover:text-indigo-50 hover:bg-indigo-600 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple" data-pd-ripple="true"><i class="pi pi-home mr-2"></i><span  style="font-size: large;">Home</span><span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span></a></li>
                     <li>
                        <a href="/sales_invoice/list" class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-indigo-100 hover:text-indigo-50 hover:bg-indigo-600 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple" data-pd-ripple="true" data-pd-styleclass="true"><i class="pi pi-book mr-2"></i><span style="font-size: large;">Sales Invoice</span><span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span></a>
                        <ul class="list-none py-3 px-6 m-0 lg:px-0 lg:py-0 border-round shadow-0 lg:border-1 border-50 lg:shadow-2 lg:absolute surface-overlay hidden origin-top w-full lg:w-15rem cursor-pointer">   
                        </ul>
                     </li>
                     <li><a href="/list" class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-indigo-100 hover:text-indigo-50 hover:bg-indigo-600 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple" data-pd-ripple="true"><i class="pi pi-book mr-2"></i><span style="font-size: large;">Quotation</span><span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span></a></li>
                     <li><a href="/admin/register" class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-indigo-100 hover:text-indigo-50 hover:bg-indigo-600 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple" data-pd-ripple="true"><i class="pi pi-users mr-2"></i><span  style="font-size: large;">Users</span><span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span></a></li>
                  </ul>
             
               </div>
            </div>
           
      <Dialog header="Password Change" v-model:visible="passwordChange" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
          <div class="col-12 md:col-4">
              <div class="p-inputgroup">
                  <Button label="Old Password"/>
                  <Password v-model="old_password" :feedback="false" />
              </div>
          </div>
          <div class="col-12 md:col-4">
              <div class="p-inputgroup">
                  <Button label="New Password"/>
                  <Password v-model="password">
                  <template #header>
                      <h6>Pick a password</h6>
                  </template>
                  <template #footer="">
                      <Divider />
                      <p class="mt-2">Suggestions</p>
                      <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                          <li>At least one lowercase</li>
                          <li>At least one uppercase</li>
                          <li>At least one numeric</li>
                          <li>Minimum 8 characters</li>
                      </ul>
                  </template>
              </Password>
              </div>
          </div>
          <div class="col-12 md:col-4">
              <div class="p-inputgroup">
                  <Button label="Confirm Password"/>
                  <Password v-model="confirm_password" :feedback="false" />
              </div>
          </div>
          <template #footer>
            <Button v-if="password !== confirm_password" class="notmatch" label="Passwords Do Not Match"  autofocus />
            <Button v-else label="Change Password" icon="pi pi-check" autofocus />
          </template>
      </Dialog>
  </header>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { storeToRefs } from "pinia";
import moment from 'moment';
 
const toast = useToast();
const first_name = ref();
const last_name = ref();
// const role = storeToRefs(authStore).role;
const date = ref()
const time = ref()
const full_date = () => date.value
const full_time = () => time.value
const password = ref()
const full_name = () => "NYASHA" + "  " + "KARATA"
const account_type = ref("CLERK")
const passwordChange = ref(false);
const confirm_password = ref()
const old_password = ref()
const loading = ref(true)
const access_levels  = ref()



onMounted(async ()=> {

setInterval(() => nowTime(), 100)
setInterval(() => todayDate(),100)
});


const closePassword = () => {
passwordChange.value = false
}
// const changePassword = async () => {

//   let result = await authStore.passwordChange()

//   if (result.data.success) {
//     toast.add({severity:'success', summary: 'Good Job', detail:'Password Succesfully Changed', life: 3000});
//     passwordChange.value = false
//     old_password.value = null
//     password.value = null
//     confirm_password.value = null

//   } else {
//     toast.add({severity:'error', summary: 'Error Message', detail:result.data.message, life: 3000});
//   }

// }


const todayDate = () => {
const timeElapsed = Date.now();
const today = new Date(timeElapsed);
const display = today.toDateString();
date.value = display
return display
}



const nowTime = () => {
const currentTime = new Date();
const  hours = currentTime.getHours();
let  minutes:any = currentTime.getMinutes();

if (minutes < 10) {
 minutes = "0" + minutes;
}
let times = hours + ":" + minutes 
time.value = times
return times
}

const user_info = ref([
      {
        label: 'Change Password',
        icon: 'pi pi-lock',
        command: () => {

          passwordChange.value = true
          // this.$toast.add({severity:'success', summary:'Updated', detail:'Data Updated', life: 3000});
        }
      },
      {
        label: 'Edit Details',
        icon: 'pi pi-user',
        command: () => {
          // window.location.href = 'https://vuejs.org/'
        }
      },
      {
        label: 'Log Out',
        icon: 'pi pi-power-off',
        command: () => {
          // logout()
          // this.$toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000});
        }
      }
    ]);


// const logout = async () => {
// const result = await authStore.logout();

// if(result.success){
//   window.location.href = "/login";
//   if(!process.server){
//     localStorage.userData = "{}";
//   }
// }
// }
</script>

<style scoped>
.splitbutton {
  display: flex;














































































































































































  justify-content: flex-end;
}
button.p-button.p-component.p-button-warning {
  background-color: black;
  margin-left: 5px;
  border-color: white;
}
button.p-button.p-component.notmatch {
  background-color: red;
  width: 100%;
  border-color: red;
}
body {
zoom: 70%;
}

</style>