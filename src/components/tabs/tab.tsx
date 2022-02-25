import { Order } from "./tabSlice";
import { beersEnum } from "../../enums/beers.enum";

export function Tab(props: Order) {
  function getDrink(selectedBeer: beersEnum) {
    return props.drink.find((beer) => beer.beer == selectedBeer);
  }
  return (
    <div className="p-4">
      <div className="border border-gray-200 p-6 rounded-lg bg-white">
        <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
          Table: {props.table}
        </h2>
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
      </div>
    </div>
  );
}
