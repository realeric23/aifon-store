import Basket from "@/components/Basket";
import Header from "@/components/Header";
import Landing from "@/components/Landing";
import Product from "@/components/Product";
import { fetchCategories } from "@/utils/fetchCategories";
import { fetchProducts } from "@/utils/fetchProducts";
import { Tab } from "@headlessui/react";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useTranslation } from "react-i18next";

interface Props {
  categories: Category[];
  products: Product[];
  session: Session | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const categories = await fetchCategories();
    const products = await fetchProducts();
    const session = await getSession(context);

    return {
      props: {
        categories,
        products,
        session,
      },
    };
  } catch (error) {
    console.error("Error fetching categories:", error);

    return {
      props: {
        categories: [],
        products: [],
        session: null,
      },
    };
  }
};

const Home = ({ categories, products }: Props) => {
  const { t } = useTranslation();
  const SCREEN_NAME = "home";
  const showProducts = (categoryId: string) => {
    return products
      .filter(
        (product) => product.category && product.category._ref === categoryId
      )
      .map((product) => <Product product={product} key={product._id} />);
  };

  const categoriesWithProducts = categories.filter((category) =>
    products.some((product) => product.category?._ref === category._id)
  );

  return (
    <>
      <Head>
        <title>i-Store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Basket />

      <main className="relative h-[200vh] bg-[#E7ECEE]">
        <Landing />
      </main>

      <section className="relative z-4 -mt-[100vh] min-h-screen bg-[#1B1B1B]">
        <div className="space-y-10 py-16">
          <h1 className="text-center text-4xl font-medium tracking-wide text-white md:text-5xl">
            {t(`${SCREEN_NAME}.title`)}
          </h1>

          <Tab.Group>
            <Tab.List className="flex justify-center">
              {categoriesWithProducts.map((category) => (
                <Tab
                  key={category._id}
                  id={category._id}
                  className={({ selected }) =>
                    `whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base ${
                      selected
                        ? "borderGradient bg-[#35383C] text-white"
                        : "border-b-2 border-[#35383C] text-[#747474]"
                    }`
                  }
                >
                  {category.title}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mx-auto max-w-fit pt-10 pb-24 sm:px-4">
              {categoriesWithProducts.map((category) => (
                <Tab.Panel key={category._id} className="tabPanel">
                  {showProducts(category._id)}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </>
  );
};

export default Home;
