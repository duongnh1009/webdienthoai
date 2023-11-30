import { getProducts } from '../../services/Api';
import ProductItem from '../../shared/components/product-item';
import { useEffect, useState } from 'react';

function Home() {
  const [featuredProduct, setFeaturedProduct] = useState([]);
  const [latestProduct, setLatestProduct] = useState([]);
  useEffect(() => {
    getProducts({
      params: {
        limit: 6,
        'filter[is_featured]': true,
      },
    }).then(({ data }) => {
      return setFeaturedProduct(data.data.docs);
    });

    getProducts({
      params: {
        limit: 6,
      },
    }).then(({ data }) => {
      return setLatestProduct(data.data.docs);
    });
  }, []);

  return (
    <>
      {/*	Feature Product	*/}
      <div className="products">
        <h3>Sản phẩm nổi bật</h3>
        <div className="product-list card-deck">
          {featuredProduct.map((value, index) => (
            <ProductItem key={index} item={value} />
          ))}
        </div>
      </div>
      {/*	End Feature Product	*/}

      {/*	Latest Product	*/}
      <div className="products">
        <h3>Sản phẩm mới</h3>
        <div className="product-list card-deck">
          {latestProduct.map((value, index) => (
            <ProductItem key={index} item={value} />
          ))}
        </div>
      </div>
      {/*	End Latest Product	*/}
    </>
  );
}

export default Home;
