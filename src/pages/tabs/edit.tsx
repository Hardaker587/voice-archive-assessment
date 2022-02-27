import { NextPage } from "next";
import { FormEvent, useState } from "react";
import Image from "next/image";
import { beerPriceEnum, beersEnum } from "../../enums/beers.enum";
import { Drink, newOrder, tabs } from "../../components/tabs/tabSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useRouter } from "next/router";
import { uuid } from "../../utilities/uuid";
const EditTab: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const tabId = router.query.tabId;

  const currentTab = useAppSelector(tabs).Tabs.find((tab) => tab.id === tabId);

  let [order, setOrder] = useState(
    !!currentTab
      ? { ...currentTab }
      : {
          id: uuid(),
          table: 0,
          guests: 1,
          drink: [
            {
              beer: beersEnum.WEISSBIER,
              quantity: 0,
              total: 0,
              writable: true,
            },
            { beer: beersEnum.IPA, quantity: 0, total: 0, writable: true },
            { beer: beersEnum.LAGER, quantity: 0, total: 0, writable: true },
          ],
          splitBill: false,
          total: 0,
        }
  );
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
    setOrder({ ...order, drink: [...newDrinksOrder, updatedBeer] });
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
                placeholder="1"
                min={1}
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
          </div>
        </div>
        <button className="btn" onClick={submitOrder}>
          Submit
        </button>
      </div>
    </>
  );
};

export default EditTab;
