import {MongoClient} from 'mongodb'

export async function helpers() {
  
    const client = await MongoClient.connect('mongodb+srv://tanvir:tanvir@cluster0.j34xwzp.mongodb.net/easin?retryWrites=true&w=majority')
return client
}
