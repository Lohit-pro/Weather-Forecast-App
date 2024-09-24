import React from "react";
import { HashLoader } from "react-spinners";

type Props = {
    color: string;
    size: number;
}

export default function Loading(props: Props) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <HashLoader
        color={props.color}
        loading={true}
        // cssOverride={override}
        size={props.size}
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier={3}
      />
    </div>
  );
}
