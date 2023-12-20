import { getRenterData } from "@/app/(root)/renter-profile/actions";
import { useQuery } from "@tanstack/react-query";

function useUserQuery() {
  const queryKey = ["userNameQuery"];

  const queryFn = async () => {
    return getRenterData().then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}

export const GetUserNameQuery = (): any => {
  const { data: userName } = useUserQuery();
  return userName?.map((data) => ({
    label: data.name,
    value: data.name,
  }));
};

export default useUserQuery;
