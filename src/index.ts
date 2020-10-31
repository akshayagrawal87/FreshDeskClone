import { ticket } from './ticket'
import { contact } from './contact'

let tickets = new ticket();
let contacts = new contact();

//IFFE To Load Ticket Table
(async () => {

    let ticketData = await (await tickets.listAllTicket()).json();
    console.log(ticketData);

    let ele = <HTMLElement>document.querySelector('.tickets');

    let table = <HTMLElement>document.createElement('table');
    table.classList.add('ticket');
    table.classList.add('table', 'table-sm');
    ele.appendChild(table);

    let thead = <HTMLElement>document.createElement('thead');
    table.appendChild(thead);

    let tr = <HTMLElement>document.createElement('tr');
    thead.appendChild(tr);

    let th1 = <HTMLElement>document.createElement('th');
    th1.setAttribute('scope', 'col');
    th1.innerText = 'No.'
    tr.appendChild(th1);

    let th2 = <HTMLElement>document.createElement('th');
    th2.setAttribute('scope', 'col');
    th2.innerText = 'Contact';
    tr.appendChild(th2)

    let th3 = <HTMLElement>document.createElement('th');
    th3.setAttribute('scope', 'col');
    th3.innerText = 'Subject';
    tr.appendChild(th3);

    let th4 = <HTMLElement>document.createElement('th');
    th4.setAttribute('scope', 'col');
    th4.innerText = 'State';
    tr.appendChild(th4);

    let th5 = <HTMLElement>document.createElement('th');
    th5.setAttribute('scope', 'col');
    th5.innerText = 'Priority';
    tr.appendChild(th5);

    let th6 = <HTMLElement>document.createElement('th');
    th6.setAttribute('scope', 'col');
    th6.innerText = 'Status';
    tr.appendChild(th6);



    let tbody = <HTMLElement>document.createElement('tbody');
    table.appendChild(tbody);





    for (let i = 0; i < ticketData.length; i++) {

        let tr = document.createElement('tr');
        tbody.appendChild(tr);

        let th = document.createElement('th');
        th.setAttribute('scope', 'row');
        th.innerHTML = `${i + 1}`;
        tr.appendChild(th);

        let td1 = document.createElement('td');
        td1.innerText = ticketData[i].ticket_cc_emails;
        tr.appendChild(td1);

        let td2 = document.createElement('td');
        td2.innerText = ticketData[i].subject;
        tr.appendChild(td2);
    }



})()