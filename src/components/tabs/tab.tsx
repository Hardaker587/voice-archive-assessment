import { Order } from "./tabSlice";
import { beersEnum } from "../../enums/beers.enum";
import { useRouter } from "next/router";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { useAppDispatch } from "../../app/hooks";
import { removeTab } from "../../components/tabs/tabSlice";

export function Tab(props: Order) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  function getDrink(selectedBeer: beersEnum) {
    return props.drink.find((beer) => beer.beer == selectedBeer);
  }
  function removeOrder() {
    dispatch(removeTab(props.id));
  }
  return (
    <div className="p-4 w-full">
      <div className="border border-gray-200 p-6 rounded-lg bg-white">
        <div className="flex justify-between items-center">
          <TrashIcon
            className="w-8 text-red-500"
            onClick={() => removeOrder()}
          />
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
            Table: {props.table}
          </h2>
          <PencilIcon
            className="w-8 text-green-500"
            onClick={() => router.push(`/tabs/edit/?tabId=${props.id}`)}
          />
        </div>

        <p className="leading-relaxed text-base">Guests: {props.guests}</p>
        <p className="leading-relaxed text-base">
          Splitting bill: {props.splitBill ? "Yes" : "No"}
        </p>

        <hr className="my-4" />

        <div className="grid grid-cols-3 gap-1">
          <div className="beer leading-relaxed text-base capitalize">
            <p>{beersEnum.WEISSBIER}</p>
            <p>{getDrink(beersEnum.WEISSBIER).quantity}</p>
          </div>
          <div className="beer leading-relaxed text-base capitalize">
            <p>{beersEnum.IPA}</p>
            <p>{getDrink(beersEnum.IPA).quantity}</p>
          </div>
          <div className="beer leading-relaxed text-base capitalize">
            <p>{beersEnum.LAGER}</p>
            <p>{getDrink(beersEnum.LAGER).quantity}</p>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between text-base">
          <div className={`${props.splitBill ? "w-1/2" : "w-full"} text-base`}>
            <div>Total:</div>
            <div className="font-black">DKK {props.total.toFixed(2)}</div>
          </div>
          {props.splitBill && (
            <>
              <div className="text-black text-base">
                <div>Per guest:</div>
                <div className="font-black">
                  DKK {(props.total / props.guests).toFixed(2)}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
