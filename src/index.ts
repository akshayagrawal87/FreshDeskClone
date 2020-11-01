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
// tickets.createTicket(
//     {

//         description: 'dummy',
//         subject: 'dummy',
//         email: 'dummy@gmail.com',
//         priority: 1,
//         status: 2,
//         cc_emails: ['akki@gmail.com']

//     }
// );



let contactBar = (<HTMLElement>document.querySelector('.contactBar'));

contactBar.addEventListener('click', (e) => {

    let contactTable = document.querySelector('.contacts');
    contactTable?.classList.remove('hide');


    let ticket = document.querySelector('.tickets')
    ticket?.classList.add('hide');


});

let ticketBar = (<HTMLElement>document.querySelector('.ticketBar'));

ticketBar.addEventListener('click', (e) => {

    let contactTable = document.querySelector('.contacts');
    contactTable?.classList.add('hide');

    let ticket = document.querySelector('.tickets')
    ticket?.classList.remove('hide');

});




//IFFE To Load Contact Table
(async () => {

    let ticketData = await (await tickets.listAllTicket()).json();
    //console.log(ticketData);

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
        editIcon.setAttribute('data-toggle', 'modal')
        editIcon.setAttribute('data-target', '#editModal')
        editIcon.setAttribute('type', 'button');
        td6.appendChild(editIcon);

        td6.innerHTML += `<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Update Ticket</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form class="createTicketForm">
										<div class="modal-body">
											<div class="form-group">
												<label for="email">Email address</label>
												<input
													type="email"
													class="form-control"
													id="emailU"
													aria-describedby="emailHelp"
                                                    placeholder="Enter email"
                                                    value=${ticketData[i].requester.email}
													required
												/>
											</div>
											<div class="form-group">
												<label for="ccemail"> CC Email address</label>
												<input
													type="email"
													class="form-control"
													id="ccemailU"
													aria-describedby="emailHelp"
                                                    placeholder="Enter ccemail"
                                                    value=${ticketData[i].cc_emails[0]}
												/>
											</div>
											<div class="form-group">
												<label for="subject">Subject</label>
												<input
													type="text"
													class="form-control"
													id="subjectU"
													placeholder="Enter Subject"
													value=${ticketData[i].subject}
												/>
											</div>

											<div class="form-group">
												<label for="priority">Priority</label>
												<select class="form-control" id="priorityU">
													<option value="1" selected>Low</option>
													<option value="2">Medium</option>
													<option value="3">High</option>
													<option value="4">Urgent</option>
												</select>
											</div>
											<div class="form-group">
												<label for="status">Status</label>
												<select class="form-control" id="statusU">
													<option value="2" selected>Open</option>
													<option value="3">Pending</option>
													<option value="4">Resolved</option>
													<option value="5">Closed</option>
												</select>
											</div>

										</div>
										<div
											class="modal-footer border-top-0 d-flex justify-content-center"
										>
											<button
												type="submit"
												class="btn btn-outline-success"
												data-dismiss="modal"
											>
												Cancel
											</button>
											<button
												type="button"
												class="btn btn-success"
                                                id="updateTicket"
                                                value=${ticketData[i].id}
											>
												Update
											</button>
										</div>
									</form>
    </div>
  </div>
</div>`

        let td7 = document.createElement('td');
        tr.appendChild(td7);

        let deleteIcon = document.createElement('i');
        deleteIcon.classList.add('far', 'fa-trash-alt');
        deleteIcon.setAttribute('data-toggle', 'modal')
        deleteIcon.setAttribute('data-target', '#deleteModal')
        deleteIcon.setAttribute('type', 'button');
        td7.appendChild(deleteIcon);

        tr.setAttribute('value', ticketData[i].id);

        td7.innerHTML += `<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Delete</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Delete this Ticket?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
        <button type="button" data-dismiss="modal" class="btn btn-primary confirmDelete" >Yes</button>
      </div>
    </div>
  </div>
</div>`

    }

    let confirmDelete = document.querySelectorAll('.confirmDelete');

    for (let i = 0; i < confirmDelete.length; i++)
        confirmDelete[i]?.addEventListener('click', async (e) => {
            e.preventDefault();
            console.log(confirmDelete[i])
            await tickets.deleteTicket(ticketData[i].id);
            window.location.reload()

        })

    let confirmCreateTicket = <HTMLElement>document.querySelector('#createTicket');

    confirmCreateTicket.addEventListener('click', async (e) => {

        let email = (<HTMLInputElement>document.getElementById('email')).value;


        let ccemail = (<HTMLInputElement>document.getElementById('ccemail')).value;


        let subject = (<HTMLInputElement>document.getElementById('subject')).value;


        let status = (<HTMLInputElement>document.getElementById('status')).value;


        let priority = (<HTMLInputElement>document.getElementById('priority')).value;


        let description = (<HTMLInputElement>document.getElementById('description')).value;


        if (email === null || email === "")
            (<HTMLInputElement>document.getElementById('email')).classList.add('errorRequired');
        else
            (<HTMLInputElement>document.getElementById('email')).classList.remove('errorRequired');
        if (ccemail === null || ccemail === "")
            (<HTMLInputElement>document.getElementById('ccemail')).classList.add('errorRequired');
        else
            (<HTMLInputElement>document.getElementById('ccemail')).classList.remove('errorRequired');
        if (subject === null || subject === "")
            (<HTMLInputElement>document.getElementById('subject')).classList.add('errorRequired');
        else
            (<HTMLInputElement>document.getElementById('subject')).classList.remove('errorRequired');
        if (description === null || description === "")
            (<HTMLInputElement>document.getElementById('description')).classList.add('errorRequired');
        else
            (<HTMLInputElement>document.getElementById('description')).classList.remove('errorRequired');

        let data = {

            description: description,
            subject: subject,
            email: email,
            priority: parseInt(priority),
            status: parseInt(status),
            cc_emails: ccemail.split(' ')

        }
        if (email !== "" && ccemail !== "" && subject !== "" && description !== "")
            await tickets.createTicket(data);
        //window.location.reload();
    })

    let confirmUpdateTicket = <HTMLElement>document.querySelector('#updateTicket');

    confirmUpdateTicket.addEventListener('click', async (e) => {

        let email = (<HTMLInputElement>document.getElementById('emailU')).value;
        console.log(email);

        let ccemail = (<HTMLInputElement>document.getElementById('ccemailU')).value;


        let subject = (<HTMLInputElement>document.getElementById('subjectU')).value;


        let status = (<HTMLInputElement>document.getElementById('statusU')).value;


        let priority = (<HTMLInputElement>document.getElementById('priorityU')).value;


        if (email === null || email === "")
            (<HTMLInputElement>document.getElementById('emailU')).classList.add('errorRequired');
        else
            (<HTMLInputElement>document.getElementById('emailU')).classList.remove('errorRequired');
        if (ccemail === null || ccemail === "")
            (<HTMLInputElement>document.getElementById('ccemailU')).classList.add('errorRequired');
        else
            (<HTMLInputElement>document.getElementById('ccemailU')).classList.remove('errorRequired');
        if (subject === null || subject === "")
            (<HTMLInputElement>document.getElementById('subjectU')).classList.add('errorRequired');
        else
            (<HTMLInputElement>document.getElementById('subjectU')).classList.remove('errorRequired');


        let data = {
            subject: subject,
            email: email,
            priority: parseInt(priority),
            status: parseInt(status),
        }
        //cc_emails: ccemail.split(' ')

        let id = parseInt((<HTMLInputElement>document.getElementById('updateTicket')).value)
        console.log(id);
        if (email !== "" && ccemail !== "" && subject !== "")
            await tickets.updateTicket(id, data);
        //window.location.reload();
    })

})();

(async () => {

    let contactData = await (await contacts.listAllContacts()).json();
    console.log(contactData);

    let ele = <HTMLElement>document.querySelector('.contacts');



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
    th3.innerText = 'Email Address';
    tr.appendChild(th3);

    // let th4 = <HTMLElement>document.createElement('th');
    // th4.setAttribute('scope', 'col');
    // th4.innerText = 'State';
    // tr.appendChild(th4);

    let th5 = <HTMLElement>document.createElement('th');
    th5.setAttribute('scope', 'col');
    th5.innerText = 'Work Phone';
    tr.appendChild(th5);

    let tbody = <HTMLElement>document.createElement('tbody');
    table.appendChild(tbody);

    for (let i = 0; i < contactData.length; i++) {

        let tr = document.createElement('tr');
        tbody.appendChild(tr);

        // let th = document.createElement('th');
        // th.setAttribute('scope', 'row');
        // th.innerHTML = `${i + 1}`;
        // tr.appendChild(th);

        let td1 = document.createElement('td');
        td1.innerText = contactData[i].name;
        tr.appendChild(td1);

        let td2 = document.createElement('td');
        td2.innerText = contactData[i].email;
        tr.appendChild(td2);

        let td3 = document.createElement('td');
        td3.innerText = contactData[i].phone;
        tr.appendChild(td3);


        let td6 = document.createElement('td');
        tr.appendChild(td6);

        let editIcon = document.createElement('i');
        editIcon.classList.add('far', 'fa-edit');
        editIcon.setAttribute('data-toggle', 'modal')
        editIcon.setAttribute('data-target', '#editContactModal')
        editIcon.setAttribute('type', 'button');
        td6.appendChild(editIcon);


        td6.innerHTML += `<div class="modal fade" id="editContactModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Update Ticket</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form class="createTicketForm">
										<div class="modal-body">
											<div class="form-group">
												<label for="email">Email address</label>
												<input
													type="email"
													class="form-control"
													id="emailCU"
													aria-describedby="emailHelp"
                                                    placeholder="Enter email"
                                                    value=${contactData[i].email}
													required
												/>
											</div>
											<div class="form-group">
												<label for="ccemail"> CC Email address</label>
												<input
													type="text"
													class="form-control"
													id="nameCU"
													aria-describedby="emailHelp"
                                                    placeholder="Enter ccemail"
                                                    value=${contactData[i].name}
												/>
											</div>
											<div class="form-group">
												<label for="subject">Phone</label>
												<input
													type="text"
													class="form-control"
													id="phoneCU"
													placeholder="Enter Phone"
													value=${contactData[i].phone}
												/>
											</div>

											
										<div
											class="modal-footer border-top-0 d-flex justify-content-center"
										>
											<button
												type="submit"
												class="btn btn-outline-success"
												data-dismiss="modal"
											>
												Cancel
											</button>
											<button
												type="button"
												class="btn btn-success"
                                                id="updateContact"
                                                value=${contactData[i].id}
                                                
											>
												Update
											</button>
										</div>
									</form>
    </div>
  </div>
</div>`


        let td7 = document.createElement('td');
        tr.appendChild(td7);

        let deleteIcon = document.createElement('i');
        deleteIcon.classList.add('far', 'fa-trash-alt');
        deleteIcon.setAttribute('data-toggle', 'modal')
        deleteIcon.setAttribute('data-target', '#deleteContactModal')
        deleteIcon.setAttribute('type', 'button');
        td7.appendChild(deleteIcon);

        tr.setAttribute('value', contactData[i].id);

        td7.innerHTML += `<div class="modal fade" id="deleteContactModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Delete</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Delete this Contact?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
        <button type="button" data-dismiss="modal" class="btn btn-primary confirmContactDelete" >Yes</button>
      </div>
    </div>
  </div>
</div>`


    }

    let confirmCreateContact = <HTMLElement>document.querySelector('#createContact');

    confirmCreateContact.addEventListener('click', async (e) => {

        let email = (<HTMLInputElement>document.getElementById('emailContact')).value;


        let name = (<HTMLInputElement>document.getElementById('name')).value;


        let phone = (<HTMLInputElement>document.getElementById('phone')).value;



        if (email === null || email === "")
            (<HTMLInputElement>document.getElementById('emailContact')).classList.add('errorRequired');
        else
            (<HTMLInputElement>document.getElementById('emailContact')).classList.remove('errorRequired');
        if (name === null || name === "")
            (<HTMLInputElement>document.getElementById('name')).classList.add('errorRequired');
        else
            (<HTMLInputElement>document.getElementById('name')).classList.remove('errorRequired');
        if (phone === null || phone === "")
            (<HTMLInputElement>document.getElementById('phone')).classList.add('errorRequired');
        else
            (<HTMLInputElement>document.getElementById('phone')).classList.remove('errorRequired');


        let data = {
            name: name,
            email: email,
            phone: phone,
        }
        if (email !== "" && name !== "" && phone !== "")
            await contacts.createContact(data);


    })

    let confirmUpdateContact = <HTMLElement>document.querySelector('#updateContact');

    confirmUpdateContact.addEventListener('click', async (e) => {

        let email = (<HTMLInputElement>document.getElementById('emailCU')).value;


        let name = (<HTMLInputElement>document.getElementById('nameCU')).value;


        let phone = (<HTMLInputElement>document.getElementById('phoneCU')).value;



        if (email === null || email === "")
            (<HTMLInputElement>document.getElementById('emailCU')).classList.add('errorRequired');
        else
            (<HTMLInputElement>document.getElementById('emailCU')).classList.remove('errorRequired');
        if (name === null || name === "")
            (<HTMLInputElement>document.getElementById('nameCU')).classList.add('errorRequired');
        else
            (<HTMLInputElement>document.getElementById('nameCU')).classList.remove('errorRequired');
        if (phone === null || phone === "")
            (<HTMLInputElement>document.getElementById('phoneCU')).classList.add('errorRequired');
        else
            (<HTMLInputElement>document.getElementById('phoneCU')).classList.remove('errorRequired');


        let data = {
            name: name,
            email: email,
            phone: phone,
        }
        let id = parseInt((<HTMLInputElement>document.getElementById('updateContact')).value)
        if (email !== "" && name !== "" && phone !== "")
            await contacts.updateContact(id, data);
        window.location.reload();


    })

    let confirmContactDelete = document.querySelectorAll('.confirmContactDelete');

    for (let i = 0; i < confirmContactDelete.length; i++)
        confirmContactDelete[i]?.addEventListener('click', async (e) => {
            e.preventDefault();
            console.log(confirmContactDelete[i])
            await contacts.deleteContact(contactData[i].id);
            window.location.reload()
        });

})();






