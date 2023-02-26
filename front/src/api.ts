import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useMutation,useQuery} from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

const client = () => axios.create({
    baseURL: "/api",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
})


function login(data: any) {
    return client().post('/user/login', data)
}

function register(data: any) {
    return client().post('/user/register', data)
}

function invite(email: string) {
    return client().post('/user/invite/' + email)
}

function getMyInvites() {
    return client().get('/user/invites').then(res => res.data)
}

function acceptInvite(id: string) {
    return client().post('/user/accept/' + id)
}

function declineInvite(id: string) {
    return client().delete('/user/decline/' + id)
}

function getMyFriends() {
    return client().get('/user/friends').then(res => res.data)
}

function sendMessage(data: any) {
    return client().post('/message', data)
}

function getMessages(id: number) {
    return () => client().get('/message/' + id).then(res => res.data)
}

function getUserById(id: number) {
    return () => client().get('/user/user/' + id).then(res => res.data)
}

export const useLogin = () => {
    const push = useNavigate()
    return useMutation(login, {
        onSuccess: (data) => {
            localStorage.setItem('token', data.data.token)
            push('/chat')
        }
    })
}

export const useRegister = () => {
    const push = useNavigate()
    return useMutation(register, {
        onSuccess: () => {
            push('/login')
        }
    })
}

export const useInvite = () => {
    return useMutation(invite, {
        onSuccess: () => {
            toast.success('Invitation sent')
        },
        onError: (error: any) => {
            toast.error(error.response.data.message)
        }
    })
}

export const useGetMyInvites = () => {
    return useQuery('invites', getMyInvites)
}

export const useAcceptInvite = () => {
    const getInvites = useGetMyInvites()
    return useMutation(acceptInvite, {
        onSuccess: () => {
            toast.success('Invitation accepted')
            getInvites.refetch()
        },
        onError: (error: any) => {
            toast.error(error.response.data.message)
            
        }
    })
}

export const useDeclineInvite = () => {
    const getInvites = useGetMyInvites()
    return useMutation(declineInvite, {
        onSuccess: () => {
            toast.success('Invitation declined')
            getInvites.refetch()
        },
        onError: (error: any) => {
            toast.error(error.response.data.message)
        }
    })
}

export const useGetMyFriends = () => {
    return useQuery('friends', getMyFriends)
}

export const useGetMessages = () => {
    const { id } = useParams()
    return useQuery('messages', getMessages(Number(id)), {
        refetchInterval: 1000
    })
}

export const useSendMessage = () => {
    const getMessages = useGetMessages()
    return useMutation(sendMessage, {
        onSuccess: () => {
            getMessages.refetch()
        }
    })
}

export const useGetUserById = () => {
    const { id } = useParams()
    return useQuery('user', getUserById(Number(id)))
}
