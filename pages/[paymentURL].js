import "../app/globals.css"
import fetch from 'node-fetch';
import {myFont} from "../app/myFont.js";
import Links from "../app/(components)/Links.js";
import { useEffect, useState} from "react"
import {db} from "../app/(components)/firestoreInit.js";
import { doc, onSnapshot } from "firebase/firestore";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

export async function getStaticPaths(){
    const paths = await fetch("https://undefxx.com/api/payments/paths").then(x => x.json())
    return {paths: paths, fallback: false}
}


export async function getStaticProps(context){

    const paymentInfo = await fetch("https://undefxx.com/api/payments/" + context.params.paymentURL).then(x => x.json())
    const unpaid = await fetch("https://undefxx.com/api/payments/unpaid").then(x=> x.json());

    return {
        props: { paymentInfo, unpaid },
        revalidate: 1
    }
}

function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default function Page(props){
    let links = [{label: "<---", href: "/"}, {label: "", href: "/"}]

    for(let elem in props.unpaid){
        if (props.unpaid[elem].url === props.paymentInfo.url)  {
            links.push({label: props.paymentInfo.name + ": $" + numberWithCommas(props.paymentInfo.amount), href:"/"});
            break;
        } else  links.push({label: "", href:"/"})
    }


    return (
            <div className={myFont.className}>
                <Links links={links}/>

            </div>
            )
}