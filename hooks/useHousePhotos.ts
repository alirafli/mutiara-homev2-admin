import { getHousePhotoById } from "@/app/(root)/rent-house/actions";
import { useQuery } from "@tanstack/react-query";

function useGetHouseQuery(id: string) {
  const queryKey = ["housePhotos", id.slice(0, 5)];

  const queryFn = async () => {
    return getHousePhotoById(id).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export default useGetHouseQuery;
