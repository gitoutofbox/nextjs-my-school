
export default async function ProductDetails({ params }: { params: Promise<{ productId: string }> }) {
    const resolvedParams = await params;
    return (
        <div>
            <h2>Product Details for ID: {resolvedParams.productId}</h2>
        </div>
    );
}