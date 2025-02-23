import { CustomerTable } from '@/components/CustomerTable';
import React, { useState } from 'react';
export default function CustomerPage(){
    return(
        <div>
            <div className='text-left text-2xl font-bold p-4'>
                Customer List
            </div>
            <CustomerTable></CustomerTable>
        </div>
        
    );
}
