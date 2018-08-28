/**
 * 图片懒加载
 * 使用方法：
 * 1. 在某一个页面的controller.js 顶部添加： import ImgLazyload '../../shared/plugins/imgLazyload';
 * 2. 在componentDidMount() 方法后添加：
 *   let imgLazyload = new ImgLazyload();
 *   imgLazyload.monitorScroll();
 * 3. 将需要懒加载的图片写为<img data-src='imgurl' />
 */

class ImgLazyload {

  // 获取当前需要lazyload的图片节点，节点有标志 data-src 且为img标签
  getAllImgEle = () => {
    return document.querySelectorAll('.img-bg[data-src]');
  }

  // 判断当前对象是否为dom对象
  isDOM = (obj) => {
    let isDOM = (obj.nodeType === 1) ? true : false;
    return isDOM;
  }

  // 获取当前图片节点距离dom顶部的距离
  getElementDocumentTop=(element) => {
    return element.getBoundingClientRect().top + document.documentElement.scrollTop;
  }

  // 滚动监听页面，当处于当前img上20px（手动设置）时，改变当前src
  monitorScroll=() => {
    this.operater();
    window.addEventListener('scroll', () => {
      this.operater();
    });
  }

  operater = () => {
    let imgList = this.getAllImgEle();
    for (let i = 0; i < imgList.length; i++) {
      if (document.documentElement.scrollTop + window.screen.height + 20 > this.getElementDocumentTop(imgList[i])) {
        if (!imgList[i].style.backgroundImage) {
          imgList[i].style.backgroundImage = `url(${imgList[i].dataset.src})`;
          imgList[i].removeAttribute('data-src');
        }
      }
    }
  }
}
export default ImgLazyload;
