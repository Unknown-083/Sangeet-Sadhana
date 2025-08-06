import { Account, Client, ID } from "appwrite";
import { appwriteEndPoint, appwriteProjectId } from "../conf/conf";

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(appwriteEndPoint)
            .setProject(appwriteProjectId);

        this.account = new Account(this.client);
    }

    createAccount = async ({ ...data }) => {
        try {
            const userAccount = await this.account.create(ID.unique(), data.email, data.password, data.name);

            if(userAccount) return this.login({email : data.email, password : data.password});
            else return userAccount;

        } catch (error) {
            console.log("AuthService :: signup :: error", error);
        }
    }

    login = async({...data}) => {
        // console.log(data);
        
        try {
            return await this.account.createEmailPasswordSession(data.email, data.password);
        } catch (error) {
            console.log("AuthService :: login :: error", error);
        }
    }

    getCurrentUser = async() => {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("AuthService :: getCurrentUser :: error", error);
            return false;
        }
    }

    logout = async() => {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("AuthService :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
export default authService;