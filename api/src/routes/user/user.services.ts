import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { source } from '../../config/db';
import { Friendship } from '../../entities/friendship.entity';
import { User } from '../../entities/user.entity';
import { getPublicKey } from '../../crypto'

export const register = async (user: {
    password: string;
    fullname: string;
    email: string;
}) => {
    try {
        await source.manager.save(User, {
                ...user,
                password: await bcrypt.hash(user.password, 9),
                N: await getPublicKey(),
        })
        return {
            ok: true,
        }
      } catch (error) {
        console.log(error);
        return {
            error: 'User already exists',
        }
      }
}

export const login = async (email: string, password: string) => {
    const user = await source.manager.findOne(User,
        {
        where: {
            email,
        },
    })

    if (!user) {
        return {
            error: 'User not found',
        }
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return {
            error: 'Invalid password',
        }
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        process.env.JWT_SECRET || "",
        {
            expiresIn: '1h',
        }
    )

    return {
        token,
    }
}


export const getUserById = async (id: number) => {
    return await source.manager.findOne(User,
        {
        where: {
            id,
        },
    })

}



export const inviteUser = async (me: User, email: string) => {

    const requestedUser = await source.manager.findOne(User, {
        where: {
          email,
        },
        relations: ['invited', 'invitedBy'],
      })

    if (requestedUser) {
        requestedUser.invitedBy.push(me);
        await source.manager.save(requestedUser);
        return requestedUser;
    }

    return {
        error: 'User does not exist',
    }
}


export const getMyInvitations = async (user: User) => {
    const me = await source.manager.findOne(User, {
        where: {
            id: user.id,
          },
          relations: ['invitedBy'],
    })
    if (me) 
    return me.invitedBy;
}


export const acceptInvitation = async (user: User, id: number) => {
    const me = await source.manager.findOne(User, {
        where: {
            id: user.id,
          },
          relations: ['invitedBy'],
    })

    const inviter = await source.manager.findOne(User, {
        where: {
            id,
          },
    })

    if (me && inviter) {
        me.invitedBy = me.invitedBy.filter((u) => u.id !== inviter.id);
  
        
        const friendship = new Friendship();
        friendship.friend1 = me;
        friendship.friend2 = inviter;
        await source.manager.save(friendship);
        await source.manager.save(me);
        return inviter;
      }
      return {
        error: 'Inviter does not exist',
      }

}

export const rejectInvitation = async (user: User, id: number) => {
    const me = await source.manager.findOne(User, {
        where: {
            id: user.id,
            },
            relations: ['invitedBy'],
    })

    const inviter = await source.manager.findOne(User, {
        where: {
            id,
            },
    })

    if (me && inviter) {
        me.invitedBy = me.invitedBy.filter((u) => u.id !== inviter.id);
        await source.manager.save(me);
        return inviter;
        }

        return {
            error: 'Inviter does not exist',
        }
}




export const getMyFriends = async (user: User) => {
    const me = await source.manager.find(Friendship, {
        where: [
            {
                friend1: user,
            },
            {
                friend2: user,
            },
        ],
        relations: ['friend1', 'friend2'],
    })

    return me.map((f) => {
        if (f.friend1.id === user.id) {
            return f.friend2;
        }

        return f.friend1;
    })
}
  