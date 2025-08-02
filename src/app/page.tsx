// "use client";
import { Suspense } from "react";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";

import { Client } from "./client";
// import { useTRPC } from "@/trpc/client";
// import { useQuery } from "@tanstack/react-query";

const Page = async() => {
  // const trpc = useTRPC();
  // trpc.CreateAI.queryOptions({ text: 123 });
  // const { data } = useQuery(trpc.CreateAI.queryOptions({ text: "John" }));
  // const  data  = await caller.CreateAI({ text: "Antonio SERVER" })
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.CreateAI.queryOptions({ text: "John PREFETCH" }));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
    <Suspense fallback={<p>Loading...</p>}>
    <Client />
    </Suspense>
    </HydrationBoundary>
  );
}

export default Page;