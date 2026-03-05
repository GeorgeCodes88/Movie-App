import React, { memo } from "react";
import { CastCard } from "./CastCard";

export const CastList = memo(({ cast, showAll }) => {
  console.log("Mapping CastList..."); // This should now only log ONCE
  return cast.map((actor) => (
    <div
      key={actor.id}
      className={showAll ? "w-full" : "flex-shrink-0 w-24 sm:w-32"}
    >
      <CastCard
        name={actor.name}
        character={actor.character}
        profile_path={actor.profile_path}
      />
    </div>
  ));
});
