import { getHouseData } from "@/app/(root)/rent-house/actions";
import { useQuery } from "@tanstack/react-query";

function useHouseQuery(hasRented?: boolean, id?: undefined | string) {
  const queryKey = ["houseNameQuery"];

  const queryFn = async () => {
    return getHouseData(hasRented, id).then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export const GetHousesNameQuery = (
  hasRented = false,
  id: undefined | string = undefined
): any => {
  const { data: houses } = useHouseQuery(hasRented, id);
  return houses?.map((data) => ({
    label: data.name,
    value: data.id,
  }));
};

export default useHouseQuery;
