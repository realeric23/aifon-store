import { addToBasket } from "@/redux/basketSlice";
import Image from "next/image";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { urlFor } from "../../sanity";

interface Props {
  product: Product;
}

function Product({ product }: Props) {
  const { t } = useTranslation();
  const SCREEN_NAME = "product";
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket(product));

    toast.success(`${product.title} ${t(`${SCREEN_NAME}.toastsuccess`)}`, {
      position: "bottom-center",
    });
  };

  return (
    <div className="flex h-fit w-[320px] select-none flex-col space-y-3 rounded-xl bg-[#35383C] p-8 md:h-[400px] md-w-[350px] md:p-10 hover:translate-y-[-2px]">
      {/*   TODO CONDITION */}
      {product.new && (
        <div className="space-y-2 text-base text-pink-500 md:text-sm ">
          <p>{t(`${SCREEN_NAME}.new`)}</p>
        </div>
      )}
      <div className="relative h-64 w-full md:h-72">
        <Image
          src={urlFor(product.image[0]).url()}
          fill
          style={{ objectFit: "contain" }}
          alt={product.title}
        />
      </div>

      <div className="flex flex-1 items-center justify-between space-x-3">
        <div className="space-y-2 text-xl text-white md:text-2xl">
          <p>{product.title}</p>
          <p>{product.price}</p>
        </div>

        <button
          type="button"
          className="text-white bg-gradient-to-r from-pink-500 to-violet-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {t(`${SCREEN_NAME}.buy`)}
        </button>
      </div>
    </div>
  );
}

export default Product;
