import { NextPage } from "next";
import { FormEvent, useState } from "react";
import Image from "next/image";
import { beerPriceEnum, beersEnum } from "../../enums/beers.enum";
import { newOrder } from "../../components/tabs/tabSlice";
import { useAppDispatch } from "../../app/hooks";
import { useRouter } from "next/router";
import { uuid } from "../../utilities/uuid";
const AddTab: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  let [order, setOrder] = useState({
    id: uuid(),
    table: 0,
    guests: 1,
    drink: [
      { beer: beersEnum.WEISSBIER, quantity: 0, total: 0, writable: true },
      { beer: beersEnum.IPA, quantity: 0, total: 0, writable: true },
      { beer: beersEnum.LAGER, quantity: 0, total: 0, writable: true },
    ],
    splitBill: false,
    total: 0,
    writable: true,
  });
  function updateTable(event: FormEvent) {
    const eventValue = event.target as HTMLTextAreaElement;
    setOrder({ ...order, table: Number(eventValue.value) });
  }
  function updateGuests(event: FormEvent) {
    const eventValue = event.target as HTMLTextAreaElement;
    setOrder({ ...order, guests: Number(eventValue.value) });
  }
  function updateDrink(event: FormEvent, selectedBeer: beersEnum) {
    const eventValue = event.target as HTMLTextAreaElement;
    const beer = order.drink.find((beer) => beer.beer === selectedBeer);
    const updatedBeer = { ...beer, quantity: Number(eventValue.value) };
    updatedBeer.total =
      Number(eventValue.value) *
      Number(beerPriceEnum[selectedBeer.toUpperCase()]);
    const newDrinksOrder = order.drink.filter(
      (drinks) => drinks.beer !== selectedBeer
    );
    const totals = newDrinksOrder.map((drink) => drink.total);
    totals.push(updatedBeer.total);
    const billTotal = totals.reduce((a, b) => a + b);
    setOrder({
      ...order,
      drink: [...newDrinksOrder, updatedBeer],
      total: billTotal,
    });
  }
  function getDrink(selectedBeer: beersEnum) {
    return order.drink.find((beer) => beer.beer == selectedBeer);
  }
  function toggleSplitBill(event: FormEvent) {
    const eventValue = event.target as HTMLInputElement;
    console.log(eventValue.checked);
    setOrder({ ...order, splitBill: Boolean(eventValue.checked) });
  }
  function submitOrder() {
    dispatch(newOrder(order));
    router.push("/");
  }
  return (
    <>
      <div className="container mx-auto flex justify-center h-screen p-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Image
              src={"/images/add-tab-hero.jpg"}
              width={"500"}
              height={"500"}
            />
          </div>
          <div>
            <div className="form-control w-full max-w-xs">
              <label className="label" htmlFor={"table"}>
                <span className="label-text">Table no</span>
              </label>
              <input
                name={"table"}
                type="number"
                placeholder="0"
                className="input input-bordered w-full max-w-xs"
                value={order.table}
                onInput={(event) => updateTable(event)}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label" htmlFor={"guests"}>
                <span className="label-text">No of guests</span>
              </label>
              <input
                name={"guests"}
                type="number"
                placeholder="0"
                className="input input-bordered w-full max-w-xs"
                value={order.guests}
                onInput={(event) => updateGuests(event)}
              />
            </div>
            <hr className={"my-4"} />
            <div className="form-control w-full max-w-xs">
              <label className="label" htmlFor={"table"}>
                <span className="label-text">Drinks</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <div className="form-control w-full max-w-xs">
                  <label className="label" htmlFor={beersEnum.WEISSBIER}>
                    <span className="label-text capitalize">
                      {beersEnum.WEISSBIER}
                    </span>
                  </label>
                  <input
                    name={beersEnum.WEISSBIER}
                    type="number"
                    placeholder="0"
                    className="input input-bordered w-full max-w-xs"
                    value={getDrink(beersEnum.WEISSBIER).quantity}
                    onInput={(event) => updateDrink(event, beersEnum.WEISSBIER)}
                  />
                  <label className="label">
                    <span className="label-text capitalize font-bold">
                      total: DKK{getDrink(beersEnum.WEISSBIER).total}
                    </span>
                  </label>
                </div>{" "}
                <div className="form-control w-full max-w-xs">
                  <label className="label" htmlFor={beersEnum.LAGER}>
                    <span className="label-text capitalize">
                      {beersEnum.LAGER}
                    </span>
                  </label>
                  <input
                    name={beersEnum.LAGER}
                    type="number"
                    placeholder="0"
                    className="input input-bordered w-full max-w-xs"
                    value={getDrink(beersEnum.LAGER).quantity}
                    onInput={(event) => updateDrink(event, beersEnum.LAGER)}
                  />
                  <label className="label">
                    <span className="label-text capitalize font-bold">
                      total: DKK{getDrink(beersEnum.LAGER).total}
                    </span>
                  </label>
                </div>{" "}
                <div className="form-control w-full max-w-xs">
                  <label className="label" htmlFor={beersEnum.IPA}>
                    <span className="label-text capitalize">
                      {beersEnum.IPA}
                    </span>
                  </label>
                  <input
                    name={beersEnum.IPA}
                    type="number"
                    placeholder="0"
                    className="input input-bordered w-full max-w-xs"
                    value={getDrink(beersEnum.IPA).quantity}
                    onInput={(event) => updateDrink(event, beersEnum.IPA)}
                  />
                  <label className="label">
                    <span className="label-text capitalize font-bold">
                      total: DKK{getDrink(beersEnum.IPA).total}
                    </span>
                  </label>
                </div>{" "}
              </div>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="cursor-pointer label">
                <span className="label-text">Split bill</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={order.splitBill}
                  onChange={toggleSplitBill}
                />
              </label>
            </div>
            <hr className="my-4" />
            <div className="text-black  flex justify-between text-base">
              <div>Total:</div>
              <div className="font-black">DKK {order.total.toFixed(2)}</div>
            </div>
            {order.splitBill && (
              <>
                <hr className="my-4" />
                <div className="text-black flex justify-between text-base">
                  <div>Total per guest:</div>
                  <div className="font-black">
                    DKK {(order.total / order.guests).toFixed(2)}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <button className="btn" onClick={submitOrder}>
          Add Tab
        </button>
      </div>
    </>
  );
};

export default AddTab;
