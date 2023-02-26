import * as services from './user.services'

export async function register(rq, rs) {
    return rs.json(await services.register(rq.body)) 
}

export async function login(rq, rs) {
    const email = rq.body.email
    const password = rq.body.password
    return rs.json(await services.login(email, password))
}

export async function invite(rq, rs) {
  const email = rq.params.email
  const user = rq.user
  return rs.json(await services.inviteUser(user, email))
}

export async function getInvites(rq, rs) {
  const user = rq.user
  return rs.json(await services.getMyInvitations(user))
}

export async function acceptInvite(rq, rs) {
  const user = rq.user
  const id = rq.params.id
  return rs.json(await services.acceptInvitation(user, id))
}

export async function declineInvite(rq, rs) {
  const user = rq.user
  const id = rq.params.id
  return rs.json(await services.rejectInvitation(user, id))
}

export async function getFriends(rq, rs) {
    const user = rq.user
  return rs.json(await services.getMyFriends(user))
}

export async function getUser(rq, rs) {
    const userId = rq.params.id
    return rs.json(await services.getUserById(userId))
}
