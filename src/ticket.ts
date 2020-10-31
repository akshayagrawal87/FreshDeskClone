import { ticketBody } from './ticketBody';

const API_KEY = "05a6oAzxbbIS2kAleZNc";

const FD_ENDPOINT = "https://akshayagrawal87.freshdesk.com";

export class ticket {


    async createTicket(ticketData: ticketBody) {


        await fetch(`${FD_ENDPOINT}/api/v2/tickets`, {
            body: JSON.stringify(ticketData),
            headers: {
                'Authorization': 'Basic ' + btoa(API_KEY),
                "Content-Type": "application/json"
            },
            method: "POST"
        })
            .then(function (res) {

                return res.json();

            })

            .then(function (data) {

                console.log(data);

            });

    }

    async listAllTicket() {

        return await fetch(`${FD_ENDPOINT}` + '/api/v2/tickets',

            {
                method: 'GET',

                headers: {
                    'Authorization': 'Basic ' + btoa(API_KEY),

                }

            })





    }

    async updateTicket(ticketId: number, updateReq: object) {

        await fetch(`${FD_ENDPOINT}/api/v2/tickets/${ticketId}`, {
            body: JSON.stringify(updateReq),
            headers: {
                'Authorization': 'Basic ' + btoa(API_KEY),
                "Content-Type": "application/json"
            },
            method: "PUT"
        })
            .then(function (res) {

                return res.json();

            })

            .then(function (data) {

                console.log(data);

            });


    }

    async deleteTicket(ticketId: number) {

        fetch(`${FD_ENDPOINT}/api/v2/tickets/${ticketId}`, {
            headers: {
                'Authorization': 'Basic ' + btoa(API_KEY),
                "Content-Type": "application/json"
            },
            method: "DELETE"
        })
    }


}