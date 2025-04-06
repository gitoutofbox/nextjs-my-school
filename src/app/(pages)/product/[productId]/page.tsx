export default function ProductDetails({ params }: { params: { productId: string } }) {
    return (
        <div>
            <h2>Product Details for ID: {params.productId}</h2>
        </div>
    );
}