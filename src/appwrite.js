import { Query, Databases, ID, Client } from "appwrite";


const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, anime) => {
  console.log(PROJECT_ID, DATABASE_ID, COLLECTION_ID);

  // Checks if the search term exist in the database
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', searchTerm)
    ]);

    // If it does exist, update the count
    if(result.documents.length > 0) {
      const doc = result.documents[0];

      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1
      })
    } else {
      // If it doesn't exist, create a new document with the search term and count as 1

      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        anime_id: anime.mal_id,
        poster_url: anime.images?.webp?.image_url || anime.images?.jpg?.image_url
      })

    }

  } catch (error) {
    
  }
}