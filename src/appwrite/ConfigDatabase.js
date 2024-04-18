import Confenv from "../confenv/Confenv";
import {ID,Client,Databases,Storage,Query} from "appwrite"

export class StorageServie{
    client = new Client()
    databases
    bucket
    constructor(){
        this.client
        .setEndpoint(Confenv.appwriteUrl)
        .setProject(Confenv.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }
    async createPost({title,slug,content,featuredImage,status,userId}){
      try{
           return await this.databases.createDocument(Confenv.appwriteDatabaseId,Confenv.appwriteCollectionId,slug,{
            title,
            content,
            featuredImage,
            status,
            userId
           })
      }
      catch(err){
            throw err
      }
 
    }
    async updatePost(slug,{title,content,featuredImage,status}){
        try{
            return await this.databases.updateDocument(Confenv.appwriteDatabaseId,Confenv.appwriteCollectionId,slug,{
                title,
                content,
                featuredImage,
                status
            })
        }
        catch(err)
        {
            throw err
        }
    }
    async deletePost(slug)
    {
        try{
            await this.databases.deleteDocument(
                Confenv.appwriteDatabaseId,
                Confenv.appwriteCollectionId,slug
            )
            return true
        }
        catch(err)
        {
            console.log(err)
            return false
        }
    }
    async getPost(slug)
    {
        try{
            return await this.databases.getDocument(
                Confenv.appwriteDatabaseId,
                Confenv.appwriteCollectionId,
                slug
            )
            console.log('i got you post')
            
        }
        catch(err)
        {
            console.log(err)
            return false
        }
    }
    async getPosts(queries = [Query.equal("status","active")]){
            try{
            return await this.databases.listDocuments(
                Confenv.appwriteDatabaseId,
                Confenv.appwriteCollectionId,
                queries
            )
            }
            catch(err)
            {
                console.log('i cant get posts')
                console.log(err)
                return false
            }
    }
    async uploadFile(file){
        try{
          return await this.bucket.createFile(
            Confenv.appwriteBucketId,
            ID.unique(),
            file
          )
        }
        catch(err){
          console.log(err)
          return false
        }
    }
    async deleteFile(fileId)
    {
        try{
            await this.bucket.deleteFile(
                Confenv.appwriteBucketId,
                fileId
            )
            return true
        }
        catch(err){
            console.log(err)
            return false
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            Confenv.appwriteBucketId,
            fileId
        )
    }

}

const storageService= new StorageServie()
export default storageService