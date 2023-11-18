import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

export default async function getFavouriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if(!currentUser){
      return [];
    }
  
    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favouriteIds || [])]
        }
      }
    })
  
    return favorites;
  } catch (error: any){
    throw new Error(error);
  }
}