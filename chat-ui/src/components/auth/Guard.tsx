import { useEffect } from "react";

import { authenticatedVar } from "../../constants/authenticated";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../../constants/errors";
import { excludedRoutes } from "../../constants/excluded-routes";
import { snackVar } from "../../constants/snack";
import { useGetMe } from "../../hooks/useGetMe";
import { usePath } from "../../hooks/usePath";

interface GuardProps {
  children: React.ReactNode;
}

const Guard = ({ children }: GuardProps) => {
  const { data: user, error } = useGetMe();
  const { path } = usePath();

  useEffect(() => {
    if (user) {
      authenticatedVar(true);
    }
  }, [user]);

  useEffect(() => {
    if (error?.networkError) {
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
    }
  }, [error]);

  return <>{excludedRoutes.includes(path) ? children : user && children}</>;
};

export default Guard;
