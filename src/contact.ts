
const API_KEY = "05a6oAzxbbIS2kAleZNc";

const FD_ENDPOINT = "https://akshayagrawal87.freshdesk.com";


export class contact {


    async createContact() {

        let response = await fetch(`${FD_ENDPOINT}/api/v2/contacts`, {
            body: "{ \"name\":\"Super Man\", \"email\":\"superman@freshdesk.com\", \"other_emails\": [\"lex@freshdesk.com\", \"louis@freshdesk.com\"] }",
            headers: {
                'Authorization': 'Basic ' + btoa(API_KEY),
                "Content-Type": "application/json"
            },
            method: "POST"
        })
        let data = await response.json();


    }

    async listAllContacts() {

        let response = await fetch("https://akshayagrawal87.freshdesk.com/api/v2/contacts", {

            headers: {
                'Authorization': 'Basic ' + btoa(API_KEY),
                "Content-Type": "application/json"
            },
            method: "GET"
        })

        let data = await response.json();

    }

    async updateContact(contactId: number, updateReq: object) {

        await fetch(`${FD_ENDPOINT}/api/v2/contacts/${contactId}`, {
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

    async delete(contactId: number) {

        fetch(`${FD_ENDPOINT}/api/v2/contacts/${contactId}/hard_delete`, {
            headers: {
                'Authorization': 'Basic ' + btoa(API_KEY),
                "Content-Type": "application/json"
            },
            method: "DELETE"
        })
    }

}