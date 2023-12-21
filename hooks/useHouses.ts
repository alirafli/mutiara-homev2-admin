import { getHouseData } from "@/app/(root)/rent-house/actions";
import { useQuery } from "@tanstack/react-query";

function useHouseQuery() {
  const queryKey = ["houseNameQuery"];

  const queryFn = async () => {
    return getHouseData().then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export const GetHousesNameQuery = (): any => {
  const { data: houses } = useHouseQuery();
  return houses?.map((data) => ({
    label: data.name,
    value: data.id,
  }));
};

export default useHouseQuery;
