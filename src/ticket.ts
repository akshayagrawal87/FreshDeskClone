import { ticketBody } from './ticketBody';

const API_KEY = "05a6oAzxbbIS2kAleZNc";

const FD_ENDPOINT = "akshayagrawal87.freshdesk.com";

export default class ticket {



    createTicket(ticketData: ticketBody) {

        let https = require("https");


        // let ticketBody = {
        //     "helpdesk_ticket": {
        //         "subject": "Dummy Ticket",
        //         "description": "My first Ticket.",
        //         "email": "akshayagrawal87@gmail.com",
        //         "priority": 1,
        //         "status": 2
        //     }
        // }

        let params = {
            hostname: FD_ENDPOINT,
            path: "/helpdesk/tickets.json",
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Content-length": JSON.stringify(ticketData).length
            },
            auth: API_KEY + ":X"

        }

        var req = https.request(params);
        req.write(JSON.stringify(ticketData));
        var res = req.end();



    }


}