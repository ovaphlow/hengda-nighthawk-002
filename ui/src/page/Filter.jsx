import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

import reducer from '../utils/reducer';

const Editbar = React.lazy(() => import('../components/Editbar'));



const initial_filter = {
  dpet_id: '',
  route: '',
  date1: dayjs().format('YYYY-MM-01'),
  date2: dayjs().format('YYYY-MM-DD'),
};

export default function Filter() {

  const [list, setList] = useState([]);

  const [dept, setDept] = React.useState([])

  const [route, setRoute] = React.useState([])

  const [filter, dispatch] = React.useReducer(reducer, initial_filter);

  useEffect(() => {

    setDept([
      { id: 1, name: 'dept1' },
      { id: 2, name: 'dept2' },
      { id: 3, name: 'dept3' },
    ])

    setRoute([
      { id: 1, name: 'route1' },
      { id: 2, name: 'route2' },
      { id: 3, name: 'route3' },
    ])

    window
      .fetch(`/api/nighthawk-002/?`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({}),
      })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((data) => {
        setList(data);
      });
  }, [])



  return (
    <div className="container-fluid">
      <Editbar />

      <div className="container">
        <div className="row mb-2">
          <div className="col">
            <label className="form-label">检查车次</label>
            <select className="form-select"
              value={filter.route}
              onChange={(event) =>
                dispatch({
                  type: 'route',
                  payload: event.target.value,
                })
              }
            >
              <option value="">未选择</option>
              {route && route.map((item) =>
                <option key={item.id}>{item.name}</option>)}
            </select>
          </div>
          <div className="col">
            <label className="form-label">车间</label>
            <select className="form-select"
              value={filter.dept_id}
              onChange={(event) => {
                dispatch({
                  type: 'dept_id',
                  payload: event.target.value,
                })
              }}
            >
              <option value="">未选择</option>
              {dept && dept.map((item) =>
                <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </div>
          <div className="col">
            <label className="form-label">开始时间</label>
            <input type="date" className="form-select"
              value={filter.date1}
              onChange={(event) =>
                dispatch({
                  type: 'date1',
                  payload: event.target.value,
                })
              } />
          </div>
          <div className="col">
            <label className="form-label">开始结束</label>
            <input type="date" className="form-select"
              value={filter.date2}
              onChange={(event) =>
                dispatch({
                  type: 'date2',
                  payload: event.target.value,
                })
              } />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col d-flex justify-content-center">
            <button className="btn btn-outline-primary mx-2">
              查询
            </button>
            <button className="btn btn-outline-success mx-2">
              导出
            </button>
          </div>
        </div>

        <div className="card shadow rounded-0">
          <div className="table-responsive">
            <table className="table table-sm table-bordered table-hover">
              <thead>
                <tr>
                  <td>车间</td>
                  <td>检查时间</td>
                  <td>检查人</td>
                  <td>检查车次</td>
                  <td>发现问题情况</td>
                </tr>
              </thead>
              <tbody>
                {list && list.map(item => (
                  <tr key={item.id}>
                    <td>{item.dept.name}</td>
                    <td>{item.dept.datime}</td>
                    <td>{item.dept.staff}</td>
                    <td>{item.dept.route}</td>
                    <td>''</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}