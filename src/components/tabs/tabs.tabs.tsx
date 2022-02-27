import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Order, tabs } from "./tabSlice";
import { Tab } from "./tab";
import { useRouter } from "next/router";

export function Tabs() {
  const dispatch = useAppDispatch();
  const currentTabs = useAppSelector(tabs);
  const router = useRouter();
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Aarhus Bar
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify, subway tile poke farm-to-table.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {currentTabs.Tabs.length >= 1 && (
              <>
                {currentTabs.Tabs.map((tab: Order, index: number) => {
                  return (
                    <div key={index}>
                      <Tab
                        id={tab.id}
                        drink={tab.drink}
                        splitBill={tab.splitBill}
                        guests={tab.guests}
                        table={tab.table}
                        total={tab.total}
                      />
                    </div>
                  );
                })}
              </>
            )}
          </div>
          <button
            className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={() => router.push("/tabs/add")}
          >
            New Tab
          </button>
        </div>
      </section>
    </div>
  );
}
