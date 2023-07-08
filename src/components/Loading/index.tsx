import { FolderIcon } from "@heroicons/react/20/solid";
import { Spinner, Typography } from "@material-tailwind/react";

interface LoadingProps {
  state: "index" | "loading";
}

export function Loading({ state }: LoadingProps) {
  return (
    <div
      className={`invisible opacity-0 pointer-events-auto  transition-all delay-300 absolute h-screen w-screen bg-white z-[1000] flex flex-col  gap-4 items-center justify-center ${
        state === "loading" && "!visible !opacity-100 !pointer-events-none"
      }`}
    >
      <div className="bg-violet-500 h-28 w-28 rounded-full flex items-center justify-center">
        <FolderIcon className="h-16 w-16 text-violet-100" />
      </div>

      <div className="flex items-center justify-center flex-col">
        <Spinner color="deep-purple" className="" />
        <Typography variant="small">Loading</Typography>
      </div>
    </div>
  );
}
