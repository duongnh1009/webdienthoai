import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../../services/Api';

function Menu() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then(({ data }) => {
      setCategories(data.data.docs);
    });
  }, []);
  return (
    <nav>
      <div id="menu" className="collapse navbar-collapse">
        <ul>
          {categories.map((categorie, index) => (
            <li key={index} className="menu-item">
              <Link to={`/category-${categorie._id}`}>{categorie.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Menu;
