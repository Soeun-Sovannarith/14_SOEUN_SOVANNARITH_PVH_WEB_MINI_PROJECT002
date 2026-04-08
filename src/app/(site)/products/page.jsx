import ProductsClient from "./ProductsClient";
import { getProducts } from "../../service/service";
import { auth } from "../../../auth";

export default async function Page() {
  const session = await auth();
  const data = await getProducts(session?.accessToken);
  const allProducts = data?.payload || [];
  const isUnauthorized = data?.status === 401 || data?.status === "401 UNAUTHORIZED";

  if (isUnauthorized) {
    return (
      <div className="mx-auto w-full max-w-7xl py-10">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-semibold text-gray-900">Luxury beauty products</h1>
          <p className="text-rose-600">You need to sign in first to view products.</p>
        </div>
      </div>
    );
  }

  return <ProductsClient initialProducts={allProducts} />;
}
