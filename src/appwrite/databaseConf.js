import { Client, Databases, Storage, ID } from "appwrite";
import { appwriteBucketId, appwriteFoldersCollectionId, appwriteDatabaseId, appwriteEndPoint, appwriteProjectId, appwriteSongsCollectionId } from "../conf/conf";

class DatabaseService {
    client = new Client();
    database;
    bucket;

    constructor() {
        console.log(appwriteEndPoint);

        this.client
            .setEndpoint(appwriteEndPoint)
            .setProject(appwriteProjectId);

        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // Folders Handling

    createFolder = async (id, { ...data }) => {
        try {
            await this.database.createDocument(
                appwriteDatabaseId,
                appwriteFoldersCollectionId,
                id,
                { ...data }
            );
        } catch (error) {
            console.log("DatabaseService :: createFolder :: error", error);
        }
    }

    getFolder = async ({ id }) => {
        try {
            return await this.database.getDocument(appwriteDatabaseId, appwriteFoldersCollectionId, id);
        } catch (error) {
            console.log("DatabaseService :: getFolder :: error", error);
        }
    }

    updateFolder = async ({ id, data }) => {
        try {
            await this.database.updateDocument(appwriteDatabaseId, appwriteFoldersCollectionId, id, data);
        } catch (error) {
            console.log("DatabaseService :: updateFolder :: error", error);
        }
    }

    deleteFolder = async ({ id }) => {
        try {
            await this.database.deleteDocument(appwriteDatabaseId, appwriteFoldersCollectionId, id);
        } catch (error) {
            console.log("DatabaseService :: deleteFolder :: error", error);
        }
    }

    getAllFolders = async () => {
        try {
            return await this.database.listDocuments(appwriteDatabaseId, appwriteFoldersCollectionId);
        } catch (error) {
            console.log("DatabaseService :: getAllFolders :: error", error);
        }
    }

    // Folder Songs Handling

    createSongFolder = async (id, { ...data }) => {
        try {
            await this.database.createDocument(
                appwriteDatabaseId, 
                appwriteSongsCollectionId, 
                id, 
                { ...data }
            );
        } catch (error) {
            console.log("DatabaseService :: createSongFolder :: error", error);
        }
    }

    getSongFolder = async(id) => {
        try {
            return await this.database.getDocument(appwriteDatabaseId, appwriteSongsCollectionId, id);
        } catch (error) {
            console.log("DatabaseService :: getSongFolder :: error", error);            
        }
    }

    getAllSongFolders = async(query) => {
        try {
            return await this.database.listDocuments(appwriteDatabaseId, appwriteSongsCollectionId, query && query);
        } catch (error) {
            console.log("DatabaseService :: getAllSongFolders :: error", error);
        }
    }

    // songs and images files

    addFile = async ( file ) => {
        try {
            return await this.bucket.createFile(appwriteBucketId, ID.unique(), file);
        } catch (error) {
            console.log("DatabaseService :: addFile :: error", error);
        }

    }

    deleteFile = async ({ fileId }) => {
        try {
            await this.bucket.deleteFile(appwriteBucketId, fileId);
        } catch (error) {
            console.log("DatabaseService :: deleteFile :: error", error);
        }
    }

    getFileView = ({ fileId }) => {
        try {
            return this.bucket.getFileView(appwriteBucketId, fileId);
        } catch (error) {
            console.log("DatabaseService :: getFile :: error", error);
        }
    }
}

const databaseService = new DatabaseService();
export default databaseService;