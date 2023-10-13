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
                    <button class="p-button p-component"  style="text-decoration: none;" @click="printHTML">
                      <span class="pi pi-print"></span>
                      Print
                    </button>
                  </div>
                  <div class="surface-card p-4 shadow-2 border-round p-fluid">
                    <div id="print-section">
        <div id="pdf">           
        <div style="width: 100%; height: 100%; border: 1px solid black; padding: 10px;" >
        <div style="display: flex; justify-content: space-between;">
            <section style="width: 100%;">
                <img src="/images/murare.png" alt="logo" width="200" height="150" style="float: left; margin-right: 1200px;">
                <br>
                <br>
                <br>
                <br>
                <br>
            </section>
            <section style="width: 100%; text-align: right;">
                <h1 style="color: red;">
                 HIRE QUOTE
                </h1>
                Quote Number: SAL-QTN-2023-
                00011 <br>
                Quote Date: 2023-10-07 <br>
               
               
                 <br>
            </section>
        </div>
        <div>
            <table style="width: 100%; padding-bottom: 10%; border-bottom:2px solid black;">
                <thead style="background-color: gray;">
                    <tr>
                        <th>

                        </th>
                        <th style="color: black;">
                            CUSTOMER DETAILS
                        </th>
                        <th>

                        </th>

                        <th>

                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td style="width: 15%; border-right: 2px solid black;">
                            Customer name:  <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            Contact Person: 
                        </td>

                        <td style="border-right: 2px solid black;">
                            Netone <br>
                            <h6 style="font-size: 13px;"></h6> <br>
                             <br>
                            <br>
                            <br>
                            
                        </td>

                        <td style="width:10%; border-right: 2px solid black;">
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                        </td>

                        <td>
                            <b>
                            VAT Number : <br>
                            Order Number : <br>
                            </b>
                             <br>
                            <br>
                            <br>
                            <br>
                            
                        </td>

                    </tr>
                </tbody>
            </table>

            <table style="width: 100%; padding-bottom: 20%; margin-top: 5%; border-bottom: 2px solid black;">
                <thead style="background-color: gray;">
                    <tr>
                        <th style="color: black;"><b> No of Vehicles</b></th>

                      

                        <th style="color: black;"><b>Vehicle Type</b></th>

                        <th style="color: black;">
                            <b>Vehicle Reg</b>
                        </th>

                        <th style="color: black;">
                            <b>Duration</b>
                        </th>

                        <th style="color: black;">
                            <b>Daily Rate</b>
                        </th>

                        <th style="color: black;">
                            <b>Estimated
Cost of Hire
</b>
                        </th>
                    </tr>
                </thead>
                <tbody style="height: 78px;">
                    <tr>
                        <td style="border-right: 2px solid black;">1</td>
                        
                        <td style="border-right: 2px solid black;">Venter Trailer<span style="padding-left: 5px;"></span></td>
                        <td style="border-right: 2px solid black;"><span style="padding-left: 5px;"></span></td>
                        <td style="border-right: 2px solid black;">
                            <span style="padding-left: 5px;">20</span>
                        </td>
                        <td style="border-right: 2px solid black; text-align: right;">$ 50.00</td>
                        <td style="text-align: right;">$ 50.00</td>
                        </tr>
                </tbody>
            </table>
        </div>
    </div>
    
    <div style="display: flex; justify-content: space-between; border: 2px solid black; border-top: none; padding-inline: 10px; padding-bottom: 30px; ">
        <section>
          <b style="text-decoration: underline;">  STANDARD TERMS & CONDITIONS </b> <br>
            1.200km free mileage per day and excess charged at 70c per km travelled <br>
          <b>  2.Quotation excludes fuel, vehicle to be delivered with full tank and returned with full tank  </b> <br>
       <b>     3.Payment is made upfront <br>
            4.Quotation is in USD <br>
            5.Quotation valid for 30 days </b> <br>
          <b>  6.Copy of driver's licence, proof of residence(city council bill) or passport and a refundable deposit of $400  </b>
      <br>
      <br>
     
        </section>
        <section style="border-left: 2px solid black; border-bottom: 2px solid black; padding:12px; margin-right: 13.3%">
          <b>  Cost excluding VAT &nbsp; $ 50.00 <br>
            VAT @15%&nbsp; $ 0.00 <br>
            Cost inclusive of VAT &nbsp; $  4,038.00 <br>
            Non taxable amount &nbsp; $ 50.00 <br>
            Total Costs
             &nbsp; $ 50.00<br>
           
        </b>

        </section>

        <!-- end of div -->
    </div>
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
    import { ref, onMounted, computed } from 'vue';
    import { useRoute } from 'vue-router';
    import html2canvas from 'html2canvas';
    import jsPDF from 'jspdf';
    import axios from 'axios';
    
    const primaryAddress = ref(null);
    const accountName = ref(null);
    const accountType = ref(null);
    const accountNumber = ref(null);
    const formattedAddress = ref(null)
    const invoiceData = ref({
        selectedCustomer: null,
        selectedSeries: null,
        selectedAccount: null,
        date: null,
        vat: 0,
        non_taxable_amount: 0,
        amount_due: 0,
        taxable_amount:0,
        advance_payment: 0,
        total_charges: 0,
        items: null
        });

    const route = useRoute();

    const formatDate = (value) => {
    const date = new Date(value);
    const day = date.getUTCDate();
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
    const year = date.getUTCFullYear();

    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
    };

    onMounted(() => {
        if (Array.isArray(route.query.invoiceData)) {
            invoiceData.value = JSON.parse(route.query.invoiceData[0]);
        } else {
            invoiceData.value = JSON.parse(route.query.invoiceData);
        }

                console.log("My items are", invoiceData.value.items);

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
                console.log(JSON.stringify(response.data.data));
                if (response.data.data === null){
                    primaryAddress.value = ' ';
                } else {
                    primaryAddress.value = response.data.data;
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
            
            formattedAddress.value = computed(() => {
                let address = primaryAddress.value;
                // let address = primaryAddress.value.replace(/<br>|(\r\n|\n|\r)/gm, ', ')
                // address = address.replace(/,\s*,/g, ',')
                // address = address.replace(/(^,)|(,$)/g, '')
                // address = address.replace(/,(?=\s*$)/, '') // Remove last comma
                // address = address.replace(/"/g, '') // Remove double quotes
                return address
            })

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

const printHTML = async () => {
  // Get the HTML element to print
  const element = document.getElementById("pdf");

  // Use html2canvas to convert the element to an image with increased DPI
  const canvas = await html2canvas(element, { dpi: 300 });

  // Get the image data URL
  const imgData = canvas.toDataURL('image/jpeg', 1.0); // Use JPEG format with maximum quality

  // Create a new jspdf instance
  const pdf = new jsPDF();

  // Add the image to the PDF document with improved quality
  pdf.addImage(imgData, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), 0, null, 'FAST');

  // Generate a blob URL from the PDF data
  const pdfBlob = pdf.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);

  // Open the PDF in a new browser tab
  window.open(pdfUrl, '_blank');
};

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