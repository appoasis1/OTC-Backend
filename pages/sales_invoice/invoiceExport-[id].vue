<template>
    <Head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=yes">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
        <title>Sales Invoice</title>
    </Head>
    <main>
        
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
                                            <td style="width: 6%;"> <br> <br>  <h6 style="font-size: 13px;">
                                                address: 
                                              
                                                
                                            
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
    </main>
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