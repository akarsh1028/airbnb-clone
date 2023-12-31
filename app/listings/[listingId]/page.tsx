import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingsById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface Iparams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: Iparams}) => {
  const listing = await getListingsById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if(!listing){
    return <EmptyState/>
  }

  return ( 
    <ListingClient
      listing={listing}
      reservations={reservations}
      currentUser={currentUser}
    />
   );
}
 
export default ListingPage;