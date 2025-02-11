import { ImBin } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

const CartItemCard = ({ product, removeProductFromCart }) => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col items-center justify-between w-full px-4 py-2 my-2 border rounded-md shadow-md xs:flex-row bg-secondary'>
            <div className='flex flex-col gap-10 xs:flex-row'>
                <div className='flex-shrink-0 p-2 bg-white rounded-md'>
                    <img className='object-cover h-40 mx-auto xs:h-14 xs:mx-0 xs:w-14' src={product.image} alt='product img' />
                </div>
                <div className='cursor-pointer' onClick={() => navigate(`/product/${product.productId}`)} >
                    <p className='text-xl'>{product.name} <span className='text-blue-500'>{product.quantity > 1 ? `x ${product.quantity}` : ''}</span> </p>
                    <p className='font-semibold text-orange-500'>{`$${product.price}`}</p>
                </div>
            </div>
            <button className='flex justify-center w-full p-2 mt-5 mb-2 bg-red-500 rounded-md xs:text-red-500 xs:bg-transparent xs:w-fit' onClick={() => removeProductFromCart(product.productId)}>
                <ImBin />
            </button>
        </div>
    );
};

export default CartItemCard;
