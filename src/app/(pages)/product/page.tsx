import SingleProduct from "./single-product";
import { API_BASE } from "@/config/api-config";

async function getProducts() {
    // console.log(process.env);
    const res = await fetch(`${API_BASE}/posts`);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export default async function Product() {
    let products = [];
    let hasError = false;
    try {
        products = await getProducts();
    } catch {
        hasError = true;

    }
    // console.log(products)
    return (
        <main className="flex min-h-screen flex-col p-6">
            <div>
                {
                    hasError && <h1>Error occurred.</h1>
                }
                {

                    !hasError && products && products.map(
                        (product: { id: number, title: string }, i: number) => (
                            <div key={product.id} className="p-4 border-b">
                                <SingleProduct idx={i} id={product.id} title={product.title} />
                                {/* <Link href={`/product/${product.id.toString()}`} >
                                    {product.id}: {product.title}
                                </Link> */}
                            </div>
                        )
                    )
                }
            </div>
        </main>
    );
}
export function generateMetadata() {
    return {
        title: "Products",
        description: "Products page",
    };
}