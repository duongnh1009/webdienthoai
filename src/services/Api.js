import Http from './Http';

//api lấy sản phẩm nổi bật, sản phẩm mới
export const getProducts = (config) => {
  return Http.get('/products', config);
};

// api lấy danh mục sản phẩm
export const getCategories = (config) => {
  return Http.get('/categories', config);
};

// api lấy danh sách sản phẩm theo ID danh mục:
export const getProductsCategory = (id, config) => {
  return Http.get(`/categories/${id}/products`, config);
};

// api lấy thông tin danh mục sản phẩm theo ID
export const getCategory = (id, config) => {
  return Http.get(`/categories/${id}`, config);
};

// api lấy chi tiết sản phẩm theo ID:
export const getProductDetail = (id, config) => {
  return Http.get(`/products/${id}`, config);
};

// api lấy bình luận theo ID sản phẩm:
export const getComments = (id, config) => {
  return Http.get(`/products/${id}/comments`, config);
};

// api thêm bình luận theo ID sản phẩm method POST:
export const createComments = (id, data, config) => {
  return Http.post(`/products/${id}/comments`, data, config);
};

export const order = (data, config) => {
  return Http.post('/order', data, config);
};
