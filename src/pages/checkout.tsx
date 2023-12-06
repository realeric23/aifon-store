import Button from "@/components/Button";
import CheckoutProduct from "@/components/CheckoutProduct";
import Header from "@/components/Header";
import { selectBasketItems, selectBasketTotal } from "@/redux/basketSlice";
import { fetchPostJSON } from "@/utils/api-helper";
import getStripe from "@/utils/get-stripe";
import { ChevronDownIcon } from "@heroicons/react/outline";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Currency from "react-currency-formatter";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Stripe from "stripe";

function Checkout() {
  const { t } = useTranslation();
  const SCREEN_NAME = "checkout";
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const router = useRouter();
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState(
    {} as { [key: string]: Product[] }
  );

  useEffect(() => {
    const groupedItems = items.reduce(
      (results, item) => {
        (results[item._id] = results[item._id] || []).push(item);
        return results;
      },
      {} as { [key: string]: Product[] }
    );

    setGroupedItemsInBasket(groupedItems);
  }, [items]);
  const [loading, setLoading] = useState(false);

  const createCheckoutSession = async () => {
    setLoading(true);

    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
      "/api/checkout_sessions",
      {
        items: items,
      }
    );

    // Internal Server Error
    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message);
      return;
    }

    // Redirect to checkout
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: checkoutSession.id,
    });

    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);

    setLoading(false);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#E7ECEE]">
      <Head>
        <title>i-Store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="mx-auto max-w-5xl pb-24">
        <div className="px-5">
          <h1 className="my-4 text-3xl font-semibold lg:text-4xl">
            {items.length > 0
              ? t(`${SCREEN_NAME}.title`)
              : t(`${SCREEN_NAME}.title1`)}
          </h1>
          <p className="my-4">{t(`${SCREEN_NAME}.subtitle`)}</p>
          {items.length === 0 && (
            <Button
              title="Continue Shopping"
              onClick={() => router.push("/")}
            />
          )}
        </div>
        {items.length > 0 && (
          <div className="mx-5 md:mx-8">
            {Object.entries(groupedItemsInBasket).map(([key, items]) => (
              <CheckoutProduct key={key} items={items} id={key} />
            ))}

            <div className="my-12 mt-6 ml-auto max-w-3xl">
              <div className="divide-y divide-gray-300">
                <div className="pb-4">
                  <div className="flex justify-between">
                    <p>{t(`${SCREEN_NAME}.subtotal`)}</p>
                    <p>
                      <Currency quantity={basketTotal} currency="USD" />
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>{t(`${SCREEN_NAME}.shipping`)}</p>
                    <p>{t(`${SCREEN_NAME}.shippingCost`)}</p>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-x-1 lg:flex-row">
                      {t(`${SCREEN_NAME}.tax`)}
                      <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
                        {t(`${SCREEN_NAME}.zip`)}
                        <ChevronDownIcon className="h-6 w-6" />
                      </p>
                    </div>
                    <p>{t(`${SCREEN_NAME}.taxCost`)}</p>
                  </div>
                </div>

                <div className="flex justify-between pt-4 text-xl font-semibold">
                  <h4>{t(`${SCREEN_NAME}.total`)}</h4>
                  <h4>
                    <Currency quantity={basketTotal} currency="USD" />
                  </h4>
                </div>
              </div>

              <div className="my-14 space-y-4">
                <h4 className="text-xl font-semibold">
                  {t(`${SCREEN_NAME}.checkout`)}
                </h4>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="order-2 flex flex-1 flex-col items-center rounded-xl bg-gray-200 p-8 py-12 text-center">
                    <h4 className="mb-4 flex flex-col text-xl font-semibold">
                      <span>{t(`${SCREEN_NAME}.monthly`)}</span>
                      <span>{t(`${SCREEN_NAME}.appleCard`)}</span>
                      <span>
                        {t(`${SCREEN_NAME}.hardcodedPrice`)}
                        <sup className="-top-1">◊</sup>
                      </span>
                    </h4>
                    <Button title={t(`${SCREEN_NAME}.button`)} />
                    <p className="mt-2 max-w-[240px] text-[13px]">
                      {t(`${SCREEN_NAME}.conditions`)}
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col items-center space-y-8 rounded-xl bg-gray-200 p-8 py-12 md:order-2">
                    <h4 className="mb-4 flex flex-col text-xl font-semibold">
                      {t(`${SCREEN_NAME}.fullPrice`)}
                      <span>
                        <Currency quantity={basketTotal} currency="USD" />
                      </span>
                    </h4>

                    <Button
                      noIcon
                      loading={loading}
                      title={t(`${SCREEN_NAME}.button1`)}
                      width="w-full"
                      onClick={createCheckoutSession}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Checkout;
