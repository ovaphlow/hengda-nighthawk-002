import React from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import reducer from '../utils/reducer';
import useAuth from '../utils/useAuth';

const initial_detail = {
  dept: '',
  datime: dayjs().format('YYYY-MM-DD HH:mm'),
  route: '',
  staff: '',
  text:''
};

const Editbar = React.lazy(() => import('../components/Editbar'));

export default function Detail() {

  const [detail, dispatch] = React.useReducer(reducer, initial_detail);

  const [user, setUser] = React.useState([])

  const [dept, setDept] = React.useState([])

  const [route, setRoute] = React.useState([])

  const { id } = useParams();

  React.useEffect(() => {

    setUser([
      { id: 1, name: 'user1' },
      { id: 2, name: 'user2' },
      { id: 3, name: 'user3' },
      { id: 4, name: 'user4' },
      { id: 5, name: 'user5' },
      { id: 6, name: 'user6' },
      { id: 7, name: 'user7' },
      { id: 8, name: 'user8' },
    ])

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

    if (!id) return;
    window
      .fetch(`/api/nighthawk-002/${id}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: 'dept', payload: data.dept });
        dispatch({ type: 'datime', payload: dayjs(data.datime).format('YYYY-MM-DD HH:mm') });
        dispatch({ type: 'route', payload: data.route });
        dispatch({ type: 'staff', payload: data.staff });
        dispatch({ type: 'text', payload: data.json_doc.text });
      });
  }, [])


  const handleSave = () => {
    window
      .fetch(`/api/nighthawk-002/`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(detail),
      })
      .then((response) => {
        if (response.status === 200) window.history.go(-1);
        else window.alert('服务器错误');
      });
  }

  const handleUpdate = () => {
    window
      .fetch(`/api/nighthawk-002/${id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(detail)
      })
      .then((response) => {
        if (response.status === 200) window.history.go(-1);
        else window.alert('服务器错误');
      });

  }

  const handleRemove = () => {
    if (!window.confirm('确定要删除当前数据？')) return;
    window
      .fetch(`/api/nighthawk-002/${id}`, {
        method: 'DELETE',
      })
      .then((response) => {
        if (response.status === 200) window.history.go(-1);
        else window.alert('服务器错误');
      });
  }

  return (
    <div className="container-fluid">
      <Editbar category={id ? '编辑' : '新增'} />
      <div className="container">
        <div className="card shadow">
          <div className="card-body">
            <div className="row gy-1 mb-2">
              <div className="col">
                <label className="form-label">车间</label>
                <select className="form-select"
                  value={detail.dept}
                  onChange={(event) => {
                    dispatch({
                      type: 'dept',
                      payload: event.target.value,
                    })
                    // dispatch({
                    //   type: 'dept',
                    //   payload: event.target.options[event.target.selectedIndex].text,
                    // })
                  }}
                >
                  <option value="">未选择</option>
                  {dept && dept.map((item) =>
                    <option key={item.id} >{item.name}</option>)}
                </select>
              </div>
              <div className="col">
                <label className="form-label">检查时间</label>
                <input type="datetime-local" className="form-select"
                  value={detail.datime}
                  onChange={(event) =>
                    dispatch({
                      type: 'datime',
                      payload: event.target.value,
                    })
                  }
                />
              </div>
              <div className="col">
                <label className="form-label">检查人</label>
                <select className="form-select"
                  value={detail.staff}
                  onChange={(event) =>
                    dispatch({
                      type: 'staff',
                      payload: event.target.value,
                    })
                  }
                >
                  <option value="">未选择</option>
                  {user && user.map((item) =>
                    <option key={item.id}>{item.name}</option>)}
                </select>
              </div>
              <div className="col">
                <label className="form-label">检查车次</label>
                <select className="form-select"
                  value={detail.route}
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
               
              <div className="col-12">
                <label className="form-label">发现问题情况</label>
                <textarea className="form-control"
                  value={detail.text}
                  onChange={(event) =>
                    dispatch({
                      type: 'text',
                      payload: event.target.value,
                    })
                  }
                />
              </div>
            </div>
            <hr />
            {
              id && (
                <button className="btn btn-danger float-left" onClick={handleRemove}>
                  删除
                </button>
              )
            }
            <button className="btn btn-success float-right" onClick={id ? handleUpdate : handleSave}>
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}