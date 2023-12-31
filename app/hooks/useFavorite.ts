import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface IUseFavorite {
  listingId: string;
  currentUser?: User | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavourited = useMemo(() => {
    const list = currentUser?.favouriteIds || [];

    return list.includes(listingId);
  },[currentUser, listingId])

  const toggleFavourite = useCallback(async (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();

    if(!currentUser){
      return loginModal.onOpen();
    }

    try{
      let request;

      if(hasFavourited){
        request = () => axios.delete(`/api/favorites/${listingId}`);
      }else {
        request = () => axios.post(`/api/favorites/${listingId}`);
      }

      await request();
      router.refresh();
      toast.success('Success');
    } catch (error){
      toast.error('Somthing went wrong.')
    }
  }, [currentUser, hasFavourited, listingId, router, loginModal]);

  return {
    hasFavourited,
    toggleFavourite
  }
}

export default useFavorite;