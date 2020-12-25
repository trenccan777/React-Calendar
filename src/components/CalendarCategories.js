import React from 'react';

export default function CalendarCategories() {
  const categories = [
    { name: 'Odbor právnych služieb', category: 1 },
    { name: 'Oddelenie vonkajších vzťahov', category: 2 },
    { name: 'Odbor výskumu a vzdelávania', category: 3 },
    { name: 'SNSĽP všeobecne', category: 4 },
    { name: 'Iné', category: 5 },
  ];

  function renderCats() {
    let catsToRender = [];
    let label = '';
    catsToRender = categories.map((category) => {
      switch (category.category) {
        case 1:
          label = 'c-red';
          break;
        case 2:
          label = 'c-blue';
          break;
        case 3:
          label = 'c-green';
          break;
        case 4:
          label = 'c-orange';
          break;
        case 5:
          label = 'c-dark-blue';
          break;
        default:
          label = '';
          break;
      }

      return (
        <li key={category.category}>
          <div className={'c-square ' + label}></div>
          {category.name}
        </li>
      );
    });

    return catsToRender;
  }

  return (
    <div className="c-cat-wrapper">
      <ul className="c-cat">{renderCats()}</ul>
    </div>
  );
}
