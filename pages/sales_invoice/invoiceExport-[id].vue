<template>
    <body>
    <div style="width: 100%; height: 100%; border: 1px solid black; padding: 10px;">
        <div style="display: flex; justify-content: space-between;">
            <section style="width: 100%;">
                <img src="" alt="murare pic" />
                <br>
                <br>
                <br>
                <br>
                <br>
            </section>
            <section style="width: 100%; text-align: right;">
                <h1>
                    Tax Invoice
                </h1>
                Invoice Number: MIZWL147 <br>
                Invoice Date: 26-Jun-23 <br>
                Business Partner Number: 0200184926 <br>
                VAT Number: 10070328 <br>
                Vendor Number (SPB): 712357
                 <br>
            </section>
        </div>
        <div>
            <table style="width: 100%; padding-bottom: 10%; border-bottom:2px solid black;">
                <thead style="background-color: gray;">
                    <tr>
                        <th>

                        </th>
                        <th>
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
                            Potraz <br>
                            1008 Perfomance Close  <br>
                            MountPleasant business Park  <br>
                            Harare <br>
                            <br>
                            Chanengeta Willias
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
                        <th> </th>

                        <th>
                            <b> DESCRIPTION</b>
                        </th>

                        <th></th>

                        <th>
                            DURATION
                        </th>

                        <th>
                            DAYS
                        </th>

                        <th>
                            DAILY RATE PER VEHICLE
                        </th>

                        <th>
                            TOTAL COST
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="border-right: 2px solid black;">
                            Vehicle Type  <br>
                            Date Out    <br>
                            Opening Mileage  <br>
                            Closing Mileage  <br>
                            Kms Travelled  <br>
                            Total free mileage  <br>
                            <br>
                            Chargeable Mileage  <br>
                            
                        </td>
                        <td style="border-right: 2px solid black;">
                            Toyota Hilux <br>
                            23-Jun-23 <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                        </td>
                        <td style="border-right: 2px solid black;">
                            Reg No <br> 
                            Date In <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                        </td>
                        <td style="border-right: 2px solid black;">
                            ADJ1324 <br>
                            26-Jun-23 <br>
                            177382 <br>
                            178444 <br>
                            1062 <br>
                            500
                            <hr>
                            562 
                        </td>
                        <td style="border-right: 2px solid black;">
                            2 <br>
                            Kms <br>
                            Kms <br>
                            Kms <br>
                            Kms <br>
                            Kms <br>
                            <br>
                            <br>
                        </td>
                        <td style="border-right: 2px solid black;">
                            $ 990,000.00 <br>
                            $ 5,400.00 <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                        </td>
                        <td>
                            $ 1,980,000.00 <br>
                            US$ 3,034,800.00 <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                        </td>
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
      <b style="font-family: cursive; font-size:14px; padding-inline-start: 30px;">
        Prepared By: 
      </b>
        </section>
        <section style="border-left: 2px solid black; border-bottom: 2px solid black; padding:12px; margin-right: 13.3%">
          <b style="text-decoration: underline;">  Cost excluding Vat &nbsp; $ 470.00 <br>
            VAT @ 15% &nbsp; $ 70.50 <br>
            Cost inclusive of Vat &nbsp; $ 540.50 <br>
            Refundable deposit &nbsp; $ 400.00 <br>
            Total Costs &nbsp; $ 940.50 <br>
        </b>

        </section>

        <!-- end of div -->
    </div>
</body>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
    const single = ref()
    const { params: { id } } = useRoute();

    

    const convertDate = (date: string, format: 'dd/mm/yy' | 'mm/dd/yy') => {
        const data = (new Date(date));

        return format.replace(/(dd)|(mm)|(yy)/g, (match) => { 
            if(match === 'dd') return data.getDate().toString().padStart(2, '0');
            else if(match === 'mm') return (data.getMonth() + 1).toString().padStart(2, '0');
            else return data.getFullYear().toString();
        });
    }
        const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'ZWL' });
};

const formatDate = (value) => {
        const date = new Date(value);
        const day = date.getUTCDate();
        const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
        const year = date.getUTCFullYear();

        const formattedDate = `${day} ${month} ${year}`;
        return formattedDate
    }








</script>

<style>
body{
    margin-top:20px;
    background:#eee;
}
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
</style>