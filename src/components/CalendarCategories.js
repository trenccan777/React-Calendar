import React, { useEffect, useState } from 'react';
import { cats } from '../shared';
import axios from '../api';

export default function CalendarCategories() {
  const [categories, setCategories] = useState([]);

  async function loadCategories() {
    let data;
    try {
      const res = await axios.get('wp-json/wp/v2/typy-udalosti-taxonomy');
      data = res.data;
    } catch (error) {
      data = [];
    }

    setCategories(
      data.map((category) => {
        return { name: category.name, category: category.slug };
      })
    );
  }

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="c-cat-wrapper">
      <ul className="c-cat">{renderCats(categories, cats)}</ul>
    </div>
  );
}

function renderCats(categories, cats) {
  let catsToRender = [];
  catsToRender = categories.map((category) => {
    return (
      <li key={category.category}>
        <div className={'c-square ' + cats[category.category]}></div>
        {category.name}
      </li>
    );
  });
  return catsToRender;
}
