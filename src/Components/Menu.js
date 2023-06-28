//reusable component.You can use same component for different purposes
import React, {useEffect} from 'react';

function Menu({title, menuObject}) { //destructuring

useEffect(() => {
  const allLi = document.querySelector('.MenuContainer ul').querySelectorAll("li");

  function changeMenuActive(){
    allLi.forEach(n=>n.classList.remove("active"));
    this.classList.add('active');
  }

  allLi.forEach(n=> n.addEventListener('click',changeMenuActive))
}, []); //empty array because you want to execute only one time when page gets loaded

  return (
    <div className='MenuContainer'>   
    <p className='title'>{title}</p>

    <ul>   
      {
        menuObject && menuObject.map((menu) => (
          <li key={menu.id}>
            {" "}
            <a href="#">
              <i>{menu.icon}</i>
              <span>{menu.name}</span>
              </a>
          </li>
        ))
      }
    </ul>
    </div>
  );
}

export { Menu };