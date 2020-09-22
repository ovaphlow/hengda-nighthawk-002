import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Editbar({ category }) {
  return (
    <div className="row edit-bar border-bottom mb-3">
      <div className="col mt-3">
        <h4 className="float-left">002.行车影像资料检查登记簿</h4>
        <ol className="breadcrumb bg-transparent p-0 justify-content-end">
          <li className="breadcrumb-item"><a href="#">首页</a></li>
          <li className={`breadcrumb-item`}>
            {category ? (
              <a href="#">002.行车影像资料检查登记簿</a>
            ) : ('002.行车影像资料检查登记簿')}
          </li>
          {
            category && (
              <li className="breadcrumb-item">
                {category}
              </li>
            )
          }
        </ol>
      </div>
      <hr />
      <div className="col">
        <div className="float-right">
          <nav className="nav nav-defult">
            <a className={`nav-link ${!category ? 'active' : ''}`} href="#">
              <FontAwesomeIcon icon={faSearch} fixedWidth />
              检索
            </a>
            <a className={`nav-link ${category === '新增' ? 'active' : ''}`} href="#/新增">
              <FontAwesomeIcon icon={faPlus} fixedWidth />
              新增
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}

