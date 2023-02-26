import * as services from './message.services'

export async function send(rq, rs) {
    const user = rq.user
    return rs.json(await services.sendMessage(user, rq.body))
}

export async function getMessages(rq, rs) {
    const user = rq.user
    const { id } = rq.params
    return rs.json(await services.getMessages(user, id))
}