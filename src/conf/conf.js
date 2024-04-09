const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_API_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_KEY),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_KEY),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_KEY),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_KEY),
};

export default conf;
