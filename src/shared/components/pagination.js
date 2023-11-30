import { useLocation, useSearchParams, Link } from 'react-router-dom';
function Pagination({ pages }) {
  const { total, limit, currentPage, next, prev, hasNext, hasPrev } = pages;
  const totalPages = Math.ceil(total / limit);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const formatUrl = (page) => {
    return `${location.pathname}?keyword=${searchParams.get('keyword')}&page=${page}`;
  };
  const renderPages = (delta = 4) => {
    const pages = [];
    const rightPages = currentPage + delta;
    const leftPages = currentPage - delta;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || i === currentPage || (i >= leftPages && i <= rightPages)) {
        pages.push(i);
      }
    }
    return pages;
  };
  return (
    <>
      <ul className="pagination">
        {hasPrev ? (
          <li className="page-item">
            <Link className="page-link" to={formatUrl(prev)}>
              Trang trước
            </Link>
          </li>
        ) : null}
        {renderPages().map((page, index) => (
          <li key={index} className={`page-item ${page === currentPage ? 'active' : ''}`}>
            <Link className="page-link" to={formatUrl(page)}>
              {page}
            </Link>
          </li>
        ))}
        {hasNext ? (
          <li className="page-item">
            <Link className="page-link" to={formatUrl(next)}>
              Trang sau
            </Link>
          </li>
        ) : null}
      </ul>
    </>
  );
}

export default Pagination;
