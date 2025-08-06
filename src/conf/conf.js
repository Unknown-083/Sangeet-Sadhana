const appwriteEndPoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const appwriteProjectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const appwriteDatabaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const appwriteFoldersCollectionId = import.meta.env.VITE_APPWRITE_FOLDERS_COLLECTION_ID;
const appwriteSongsCollectionId = import.meta.env.VITE_APPWRITE_SONGS_COLLECTION_ID;
const appwriteBucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID;

export {appwriteBucketId, appwriteFoldersCollectionId, appwriteSongsCollectionId, appwriteDatabaseId, appwriteEndPoint, appwriteProjectId};
