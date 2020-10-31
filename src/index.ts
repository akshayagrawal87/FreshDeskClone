import { ticket } from './ticket'
import { contact } from './contact'

function getpriority(num: number): string {

    if (num === 1)
        return 'Low';
    if (num === 2)
        return 'Medium'
    if (num === 3)
        return 'High'
    if (num === 4)
        return 'Urgent'

    return ""

}

function getStatus(num: number): string {

    if (num === 2)
        return 'Open';
    if (num === 3)
        return 'Pending'
    if (num === 4)
        return 'Resolved'
    if (num === 5)
        return 'Closed'

    return ""

}

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

    // let th1 = <HTMLElement>document.createElement('th');
    // th1.setAttribute('scope', 'col');
    // th1.innerText = 'No.'
    // tr.appendChild(th1);

    let th2 = <HTMLElement>document.createElement('th');
    th2.setAttribute('scope', 'col');
    th2.innerText = 'Contact';
    tr.appendChild(th2)

    let th3 = <HTMLElement>document.createElement('th');
    th3.setAttribute('scope', 'col');
    th3.innerText = 'Subject';
    tr.appendChild(th3);

    // let th4 = <HTMLElement>document.createElement('th');
    // th4.setAttribute('scope', 'col');
    // th4.innerText = 'State';
    // tr.appendChild(th4);

    let th5 = <HTMLElement>document.createElement('th');
    th5.setAttribute('scope', 'col');
    th5.innerText = 'Priority';
    tr.appendChild(th5);

    let th6 = <HTMLElement>document.createElement('th');
    th6.setAttribute('scope', 'col');
    th6.innerText = 'Status';
    tr.appendChild(th6);

    let th7 = <HTMLElement>document.createElement('th');
    th7.setAttribute('scope', 'col');
    th7.innerText = 'Due By';
    tr.appendChild(th7);



    let tbody = <HTMLElement>document.createElement('tbody');
    table.appendChild(tbody);





    for (let i = 0; i < ticketData.length; i++) {

        let tr = document.createElement('tr');
        tbody.appendChild(tr);

        // let th = document.createElement('th');
        // th.setAttribute('scope', 'row');
        // th.innerHTML = `${i + 1}`;
        // tr.appendChild(th);

        let td1 = document.createElement('td');
        td1.innerText = ticketData[i].requester.name;
        tr.appendChild(td1);

        let td2 = document.createElement('td');
        td2.innerText = ticketData[i].subject;
        tr.appendChild(td2);

        let td3 = document.createElement('td');
        td3.innerText = getpriority(ticketData[i].priority);
        tr.appendChild(td3);

        let td4 = document.createElement('td');
        td4.innerText = getStatus(ticketData[i].status);
        tr.appendChild(td4);

        let td5 = document.createElement('td');
        td5.innerText = ticketData[i].fr_due_by;
        tr.appendChild(td5);

        let td6 = document.createElement('td');
        tr.appendChild(td6);

        let editIcon = document.createElement('i');
        editIcon.classList.add('far', 'fa-edit');
        td6.appendChild(editIcon);

        let td7 = document.createElement('td');
        tr.appendChild(td7);

        let deleteIcon = document.createElement('i');
        deleteIcon.classList.add('far', 'fa-trash-alt');
        td7.appendChild(deleteIcon);




    }



})()