<template>
    <header class="header">
        <div class="container-fluid">
          <div class="row">
            <div class=" col-4">
              <div class="header-left d-flex align-items-center">
                <div class="menu-toggle-btn mr-20">
                  <button
                    id="menu-toggle"
                    class="main-btn btn-hover btn-outline"
                  >
                    <i class="pi pi-chevron-left me-2"></i> Menu
                  </button>
                </div>
              </div> 
            </div>
            <div class="col-4 splitbutton">
              <!-- <Button type="button"  icon="pi pi-calendar" class="p-button-warning"/>
              <Button type="button"  icon="pi pi-clock" class="p-button-warning"/> -->
           </div>
           
            <div class="col-4 splitbutton">
               
                <!-- <SplitButton :label="" icon="pi pi-user" :model="user_info"></SplitButton> -->
                
            </div>
          </div>
        </div>
        <Dialog header="Password Change" v-model:visible="passwordChange" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
            <div class="col-12 md:col-4">
                <div class="p-inputgroup">
                    <Button label="Old Password"/>
                    <Password :feedback="false" />
                </div>
            </div>
            <div class="col-12 md:col-4">
                <div class="p-inputgroup">
                    <Button label="New Password"/>
                    <Password >
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
                    <Password :feedback="false" />
                </div>
            </div>
            <template #footer>
              <Button  class="notmatch" label="Passwords Do Not Match"  autofocus />
              <Button icon="pi pi-check" autofocus />
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
const passwordChange = ref(false);
const loading = ref(true)




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
  return display
}



const nowTime = () => {
  const currentTime = new Date();
  const  hours = currentTime.getHours();
  let  minutes:any = currentTime.getMinutes();

	if (minutes < 10) {
	 minutes = "0" + minutes;
  }
  let time = hours + ":" + minutes 
  // authStore.time = time
  return time
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
            logout()
						// this.$toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000});
					}
				}
			]);


const logout = async () => {
  // // const result = await authStore.logout();
  
  // if(result.success){
  //   window.location.href = "/login";
  //   if(!process.server){
  //     localStorage.userData = "{}";
  //   }
  // }
}
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