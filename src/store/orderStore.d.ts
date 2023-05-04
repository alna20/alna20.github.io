declare module "@/store/orderStore" {
    import { Payload } from "@/interfaces";
    import { Store } from "pinia";

    export const usePayloadStore: () => Store<Payload>;
}
