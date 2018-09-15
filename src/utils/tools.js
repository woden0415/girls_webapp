
function getStorage(key) {
  let value = window.sessionStorage.getItem(key);
  return value || 0;
}

function setStorage(key, value) {
  window.sessionStorage.setItem(key, value);
}

function setPageIndex(pageNo = 1, pageSize = 10, albumIndex = 0) {
  setStorage('pageNo', pageNo)
  setStorage('pageSize', pageSize)
  setStorage('albumIndex', albumIndex)
}
export {
  getStorage,
  setStorage,
  setPageIndex
}