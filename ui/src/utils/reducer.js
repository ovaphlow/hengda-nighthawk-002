// 第二版：缩减 action 的数据结构
export default function reducer(state, action) {
  return {
    ...state,
    [action.type]: action.payload,
  };
}

// 第一版
// export default function reducer(state, action) {
//   switch (action.type) {
//     case 'set':
//       return {
//         ...state,
//         [action.payload.key]: action.payload.value,
//       };
//     default:
//       return state;
//   }
// }
