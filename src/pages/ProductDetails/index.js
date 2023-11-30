import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { getProductDetail, getComments, createComments } from '../../services/Api';
import { getImageProduct } from '../../shared/ultils';
import { ADD_CART } from '../../shared/constants/action-type';

function ProductDetail() {
  const params = useParams();
  const id = params.id;
  const [productDetails, setProductDetails] = useState('');
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetail(id).then(({ data }) => {
      setProductDetails(data.data);
    });

    commentInput(id);
  }, [id]);

  //them san pham vao gio hang
  const handleAddCart = (type) => {
    if (productDetails) {
      const { _id, name, price, image } = productDetails;
      dispatch({
        type: ADD_CART,
        payload: {
          _id,
          name,
          price,
          image,
          qty: 1,
        },
      });
    }
    if (type === 'buy-now') {
      navigate('/cart');
    }
  };

  //binh luan
  const commentInput = (id) => {
    getComments(id).then(({ data }) => {
      setComments(data.data.docs);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createComments(id, inputComment).then(({ data }) => {
      if (data.status == 'success') {
        setInputComment({});
      }
      commentInput(id);
    });
  };

  const onInput = (e) => {
    const { name, value } = e.target;
    setInputComment({
      ...inputComment,
      [name]: value,
    });
  };

  return (
    <>
      <div>
        {/*	List Product	*/}
        <div id="product">
          <div>
            <div id="product-head" className="row">
              <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
                <img src={getImageProduct(productDetails.image)} />
              </div>
              <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
                <h1>{productDetails.name}</h1>
                <ul>
                  <li>
                    <span>Bảo hành:</span> 12 Tháng
                  </li>
                  <li>
                    <span>Đi kèm:</span> {productDetails.accessories}
                  </li>
                  <li>
                    <span>Tình trạng:</span> {productDetails.status}
                  </li>
                  <li>
                    <span>Khuyến Mại:</span> {productDetails.promotion}
                  </li>
                  <li id="price">Giá Bán (chưa bao gồm VAT)</li>
                  <li id="price-number">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                      productDetails.price,
                    )}
                  </li>
                  <li id="status">{productDetails.is_stock ? 'còn hàng' : 'hết hàng'}</li>
                </ul>
                <div id="add-cart">
                  <button onClick={() => handleAddCart('buy-now')} className="btn btn-warning mr-2">
                    mua ngay
                  </button>
                  <button onClick={handleAddCart} className="btn btn-info">
                    thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
            <div id="product-body" className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <h3>Đánh giá về {productDetails.name}</h3>
                <p>{productDetails.details}</p>
              </div>
            </div>

            {/*	Comment	*/}
            <div id="comment" className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <h3>Bình luận sản phẩm</h3>
                <form method="post">
                  <div className="form-group">
                    <label>Tên:</label>
                    <input
                      value={inputComment.name || ''}
                      onChange={onInput}
                      name="name"
                      required
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      value={inputComment.email || ''}
                      onChange={onInput}
                      name="email"
                      required
                      type="email"
                      className="form-control"
                      id="pwd"
                    />
                  </div>
                  <div className="form-group">
                    <label>Nội dung:</label>
                    <textarea
                      value={inputComment.content || ''}
                      onChange={onInput}
                      name="content"
                      required
                      rows={8}
                      className="form-control"
                      defaultValue={''}
                    />
                  </div>
                  <button type="submit" name="sbm" className="btn btn-primary" onClick={handleSubmit}>
                    Gửi
                  </button>
                </form>
              </div>
            </div>
            {/*	End Comment	*/}

            {/*	Comments List	*/}
            <div id="comments-list" className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                {comments.map((comment, index) => (
                  <div key={index} className="comment-item">
                    <ul>
                      <li>
                        <b>{comment.name}</b>
                      </li>
                      <li>{moment(comment.createdAt).fromNow()}</li>
                      <li>
                        <p>{comment.content}</p>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/*	End Comments List	*/}
        </div>
        {/*	End Product	*/}

        <div id="pagination">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#">
                Trang trước
              </a>
            </li>
            <li className="page-item active">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Trang sau
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
