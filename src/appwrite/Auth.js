import Confenv from '../confenv/Confenv'
import {Client,Account,ID} from 'appwrite'
// 90fb6e094aeea04cc2f5c5bca5e41f4442617c4f191778fe4da82ab117e703cb13153a31ccb7474894d5e32803d7ec342abd2bbd685f0543542ca8971936a418a1f7df78bf6c607753e1554161fa404edba63f829e0832d2cf6e4c184238cfeaab275d8238ccf1836c3bd07f9c2afb7f14b16218c2249a1ebc41fc0f85eae39e
export class AuthService{
    client
    account
    constructor(){
        this.client = new Client()
       
             .setEndpoint(Confenv.appwriteUrl)
             .setProject(Confenv.appwriteProjectId)
             

             this.account=new Account(this.client)
            //  console.log(Confenv.appwriteUrl,Confenv.appwriteProjectId)
    }
    async createAccount({email,password,name}){
        try{
              
              const userAccount=await this.account.create(ID.unique(),email,password,name)
              if(userAccount){
                //call another method
                return this.login({email,password})
              }
              else
              {
                return userAccount
              }

        }
        catch(err){
            throw err
        }
  
    } 
    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser()
    {
        
         try{
              return await this.account.get()
              
         } 
         catch(error){
        
            console.log("", error);
         }
         return null
    }
    async logout()
    {
        try{
               await this.account.deleteSessions()
        }
        catch(err){
            console.log('this is an err',err)
        }
    }
}


const authService = new AuthService()
export default authService