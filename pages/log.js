import {myFont} from "../app/myFont";
import React from "react";
import Links from "../app/(components)/Links";
import "../app/globals.css";
import fetch from 'node-fetch';
import {
  DataGridPremium,
  GridToolbar,
  useGridApiRef,
  useKeepGroupedColumnsHidden,
} from '@mui/x-data-grid-premium';
import Box from '@mui/material/Box';
import { useDemoData } from '@mui/x-data-grid-generator';




export async function getStaticProps(){

    const unpaid = await fetch("https://undefxx.com/api/payments/unpaid").then(x => x.json())

    return{
        props: {unpaid},
        revalidate: 1
    }
}


export default function Log(props){
    let links = [{label: "<---", href: "/"}, {label: "", href: "/"}]

    for(let elem in props.unpaid) {
        links.push({label: "", href: '/'})
    }
    links.push({label: "...", href: '/'})

    const { data, loading } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 100,
        editable: true,
        visibleFields: [
            'commodity',
            'quantity',
            'filledQuantity',
            'status',
            'isFilled',
            'unitPrice',
            'unitPriceCurrency',
            'subTotal',
            'feeRate',
            'feeAmount',
            'incoTerm',
            ],
    });


    return(
            <div className={myFont.className}>
                <Links links = {links}/>
                <Box className={"dataGrid"} sx ={{height: 420, width: 540 }}>
                    <DataGridPremium {...data} />
                </Box>
            </div>
    )
}