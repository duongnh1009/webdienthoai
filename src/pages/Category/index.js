import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getProductsCategory, getCategory } from '../../services/Api';
import { useEffect, useState } from 'react';
import ProductItem from '../../shared/components/product-item';

function Category() {
  const params = useParams();
  const id = params.id;
  const [products, setProducts] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const [categorys, setCategorys] = useState('');

  useEffect(() => {
    getProductsCategory(id).then(({ data }) => {
      setTotalProduct(data.data.docs.length);
      setProducts(data.data.docs);
    });

    getCategory(id).then(({ data }) => {
      setCategorys(data.data);
    });
  }, [id]);

  return (
    <>
      {/*	List Product	*/}
      <div className="products">
        <h3>
          {categorys?.name} (hiện có {totalProduct} sản phẩm)
        </h3>
        <div className="product-list card-deck">
          {products.map((product, index) => (
            <ProductItem key={index} item={product} />
          ))}
        </div>
      </div>
      {/*	End List Product	*/}

      <div id="pagination">
        <ul className="pagination">
          <li className="page-item">
            <Link to="/productdetail" className="page-link">
              Trang trước
            </Link>
          </li>
          <li className="page-item active">
            <Link to="/productdetail" className="page-link">
              1
            </Link>
          </li>
          <li className="page-item">
            <Link to="/productdetail" className="page-link">
              2
            </Link>
          </li>
          <li className="page-item">
            <Link to="/productdetail" className="page-link">
              3
            </Link>
          </li>
          <li className="page-item">
            <Link to="/productdetail" className="page-link">
              Trang sau
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Category;
