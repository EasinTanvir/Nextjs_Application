import {hash,compare} from 'bcryptjs'

export async function hashedPasswords(password){

    const pass = await hash(password,12)

    return pass
}

export async function verifyPasswords(passwords,hashedpass){

    const verify = await compare(passwords,hashedpass)
    return verify

}