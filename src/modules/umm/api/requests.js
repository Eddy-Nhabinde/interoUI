import React, { useContext } from "react";
import { useFetch } from "../../../hooks/useFetch";

export const fetchSummaries = () => {
  const fetchUsers = useFetch("api/users");

  return fetchUsers;
};
