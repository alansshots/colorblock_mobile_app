import { Account, Client, ID, Databases, Avatars, Query, Storage} from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.alen.aora',
    projectId: '66422e7d002531f8030c',
    databaseId: '664230c2000be07fbab0',
    userCollectionId: '664231230016ea4ba7f1',
    videoCollectionId: '664231410027b03b2bb4',
    storageId: '66423326000b8a68679d'
}

const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform) 
;

const account = new Account(client);
// const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email, password, username) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

    if(!newAccount) throw Errorl

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
        config.databaseId,
        config.userCollectionId,
        ID.unique(),
        {
            accountId: newAccount.$id,
            email: email,
            username: username,
            avatar: avatarUrl,
        }
    );
    return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error)
    } 
}

// Sign In
export async function signIn(email, password) {
    try {
      const session = await account.createEmailSession(email, password);
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }