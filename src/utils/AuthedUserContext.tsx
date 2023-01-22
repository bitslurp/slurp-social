import { User } from "@spling/social-protocol";
import merge from "lodash/merge";
import React, { FunctionComponent, PropsWithChildren } from "react";
import useSWR from "swr";
import { SlurpUser } from "./types";
import { useSocialProtocolGetters } from "./useSocialProtocolGetters";

const toSlurpUser = (user: User | null): SlurpUser | null =>
  user && { ...user, publicKey: user.publicKey.toString() };

type AppData = {
  authedUser?: SlurpUser | null;
  shouldCreateUser?: boolean;
  loadingUser?: boolean;
  updateUser: (user: User) => void;
  refreshUser?: () => Promise<SlurpUser | null>;
};

export const AuthedUserContext = React.createContext<AppData>({});

export const AuthedUserProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const socialProto = useSocialProtocolGetters();
  // TODO: needs updating to taking into account wallet switch,.
  const auth = useSWR("authed-user", () =>
    socialProto?.getAuthedUser().then(toSlurpUser)
  );

  return (
    <AuthedUserContext.Provider
      value={{
        authedUser: auth.data,
        loadingUser: !auth.data && auth.isLoading,
        shouldCreateUser: !auth.isLoading && auth.data === null,
        refreshUser: async () => {
          if (!socialProto) throw new Error("");
          const user = await socialProto.getAuthedUser().then(toSlurpUser);

          auth.mutate(user);

          return user;
        },
        updateUser: (user: User) => {
          // merge because update method doesn't have pubkey for some reason
          const mergedUser = toSlurpUser(merge({}, auth.data, user));

          auth.mutate(mergedUser);
        },
      }}
    >
      {children}
    </AuthedUserContext.Provider>
  );
};