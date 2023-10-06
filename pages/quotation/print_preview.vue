<template>
    <NuxtLayout name="dashboard">
      <section class="section" style="padding-top: 40px;">
        <div class="container-fluid">
          <div class="block-section">
            <div class="block-content">
              <div class="">
                <div class="surface-ground px-4 py-8 md:px-6 lg:px-8">
                  <div class="text-900 font-medium text-xl mb-3">Quotation Print Preview</div>
                  <div class="d-flex justify-content-end mb-3">
                    <button class="p-button p-component" style="text-decoration: none;" @click="printPage">
                      <span class="pi pi-print"></span>
                      Print
                    </button>
                  </div>
                  <div class="surface-card p-4 shadow-2 border-round p-fluid">
                    <div id="print-section">
                    
                            <div class="document-container">
                                <div style="display: flex; justify-content: flex-end;">
                                <div>
                                    <img src="/images/murare.png" alt="logo" width="200" height="150" style="float: left; margin-right: 1200px;">
                                </div>
                                <div style="text-align: right; display: flex; flex-direction: column;">
                                    <h2 style="color: red; margin-bottom: 20px;">Fiscal Tax Invoice</h2>
                                    <h6 style="margin-bottom: 20px; ">Invoice Number: 200</h6>
                                    <h6 style="margin-bottom: 20px; ">Invoice Date: 200</h6>
                                    <h6 style="margin-bottom: 20px; ">Business Partner Number: 0300068944</h6>
                                    <h6 style="margin-bottom: 20px;">VAT Number: 10070328</h6>
                                    <h6 style="margin-bottom: 20px; ">Vendor Number (SPB): 712357</h6>
                                </div>
                                </div>


                                <table class="table table-bordered" style="border: 1px solid black;">
                                    <tbody>
                                        <tr>
                                            <th colspan="4" style="background-color: #888888; text-align: center;"><b>Customer Details</b></th>
                                        </tr>
                                        <tr>
                                            <td style="width: 6%;">Customer name: <br><br><br>  Contact Person:</td>
                                            <td style="width: 6%;"> <br> <br>  {{ invoiceData.selectedCustomer }} <h6 style="font-size: 13px;">
                                                {{ primaryAddress }}
                                                
                                            
                                            </h6> <br> 200 </td>
                                            <td style="width: 15%;">VAT Number : 200<br> Order Number : 200</td>
                                            <td style="width: 10%;"></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table class="table table-bordered" style="border: 1px solid black;">
                                    <tbody>
                                        <tr>
                                            <th style="background-color: #888888;">Item</th>
                                            <th style="background-color: #888888;">Description</th>
                                            <th style="background-color: #888888;">Vehicle Type</th>
                                            <th style="background-color: #888888;">Vehicle Reg</th>
                                        
                                            <th class="text-right" style="background-color: #888888;">Quantity</th>
                                            <th class="text-right" style="background-color: #888888;">Rate</th>
                                            <th class="text-right" style="background-color: #888888;">Amount</th>
                                        
                                        </tr>
                                        <tr>
                                       
                                            <td style="width: 10%;">200</td>
                                            <td style="width: 20%;">200</td>
                                            <td style="width: 10%;">
                                                <div style="border: 0px;">200</div>
                                            </td>
                                            
                                            <td style="width: 10%;">
                                                <div style="border: 0px;">200</div>
                                            </td>
                                    
                                            <td style="width: 6%;">200</td>
                                        <td style="width: 8%;" class="text-right">200</td>
                                <td style="width: 12%;" class="text-right">$ 200</td>
                                        
                                        </tr>
                                       
                                    </tbody>
                                </table>

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
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import axios from 'axios';


    const primaryAddress = ref(null);
    const accountName = ref(null);
    const accountType = ref(null);
    const accountNumber = ref(null);
    const invoiceData = ref({
        selectedCustomer: null,
        selectedSeries: null,
        selectedAccount: null,
        date: null,
       
        });

    const route = useRoute();

    onMounted(() => {
        if (Array.isArray(route.query.invoiceData)) {
            invoiceData.value = JSON.parse(route.query.invoiceData[0]);
        } else {
            invoiceData.value = JSON.parse(route.query.invoiceData);
        }

            const getCustomerAddress = async () => {
          
            var data = JSON.stringify({
                "selectedCustomer": invoiceData.value.selectedCustomer,
            });
            var config = {
                method: 'post',
                url: '/customer-detail/',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                //console.log(JSON.stringify(response.data));
                primaryAddress.value = response.data.data;
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

            const getBankingDetails = async () => {
          
          var data = JSON.stringify({
              "selectedAccount": invoiceData.value.selectedAccount,
          });
          var config = {
              method: 'post',
              url: '/bank-detail/',
              headers: { 
                  'Content-Type': 'application/json'
              },
              data: data
          };

          const result: any = await axios(config).then(function (response) {
              
              accountName.value = response.data.data.account;
              accountType.value = response.data.data.account_type;
              accountNumber.value = response.data.data.account_number;
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

            getBankingDetails();
            getCustomerAddress();

        });
        

    function printPage() {
        const printContents = document.getElementById('print-section').innerHTML;
        const printWindow = window.open('', '', 'height=500,width=500');
        printWindow.document.write(`
            <html>
            <head>
                <title>Sales Invoice Print Preview</title>
            </head>
            <body>
                ${printContents}
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
}
</script>

<style>
    .document-container {
        border: 1px solid black;
        padding: 10px; /* Optional: Add padding for better visual appearance */
    }

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