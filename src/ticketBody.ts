export interface ticketBody {

    helpdesk_ticket: {
        subject: string,
        description: string,
        email: string,
        priority: number,
        status: number
    }

}