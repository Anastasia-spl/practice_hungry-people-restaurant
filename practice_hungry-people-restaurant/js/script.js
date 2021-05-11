"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  var _document$querySelect = document.querySelector(".header").getBoundingClientRect(),
      pageHeaderHeight = _document$querySelect.height;

  document.body.style.paddingTop = "".concat(pageHeaderHeight, "px");
})();

; // куда? (класс объекта) ,  когда? (ширина экрана) , каким по счету должен стать? (одна цифра/ first/last) 

var DynamicAdapt = /*#__PURE__*/function () {
  function DynamicAdapt(type) {
    _classCallCheck(this, DynamicAdapt);

    this.type = type;
  }

  _createClass(DynamicAdapt, [{
    key: "init",
    value: function init() {
      var _this = this;

      // массив объектов
      this.оbjects = [];
      this.daClassname = '_dynamic_adapt_'; // массив DOM-элементов

      this.nodes = _toConsumableArray(document.querySelectorAll('[data-da]')); // наполнение оbjects объктами

      this.nodes.forEach(function (node) {
        var data = node.dataset.da.trim();
        var dataArray = data.split(',');
        var оbject = {};
        оbject.element = node;
        оbject.parent = node.parentNode;
        оbject.destination = document.querySelector("".concat(dataArray[0].trim()));
        оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
        оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
        оbject.index = _this.indexInParent(оbject.parent, оbject.element);

        _this.оbjects.push(оbject);
      });
      this.arraySort(this.оbjects); // массив уникальных медиа-запросов

      this.mediaQueries = this.оbjects.map(function (_ref) {
        var breakpoint = _ref.breakpoint;
        return "(".concat(_this.type, "-width: ").concat(breakpoint, "px),").concat(breakpoint);
      }).filter(function (item, index, self) {
        return self.indexOf(item) === index;
      }); // навешивание слушателя на медиа-запрос
      // и вызов обработчика при первом запуске

      this.mediaQueries.forEach(function (media) {
        var mediaSplit = media.split(',');
        var matchMedia = window.matchMedia(mediaSplit[0]);
        var mediaBreakpoint = mediaSplit[1]; // массив объектов с подходящим брейкпоинтом

        var оbjectsFilter = _this.оbjects.filter(function (_ref2) {
          var breakpoint = _ref2.breakpoint;
          return breakpoint === mediaBreakpoint;
        });

        matchMedia.addEventListener('change', function () {
          _this.mediaHandler(matchMedia, оbjectsFilter);
        });

        _this.mediaHandler(matchMedia, оbjectsFilter);
      });
    } // Основная функция

  }, {
    key: "mediaHandler",
    value: function mediaHandler(matchMedia, оbjects) {
      var _this2 = this;

      if (matchMedia.matches) {
        оbjects.forEach(function (оbject) {
          оbject.index = _this2.indexInParent(оbject.parent, оbject.element);

          _this2.moveTo(оbject.place, оbject.element, оbject.destination);
        });
      } else {
        оbjects.forEach(function (_ref3) {
          var parent = _ref3.parent,
              element = _ref3.element,
              index = _ref3.index;

          if (element.classList.contains(_this2.daClassname)) {
            _this2.moveBack(parent, element, index);
          }
        });
      }
    } // Функция перемещения

  }, {
    key: "moveTo",
    value: function moveTo(place, element, destination) {
      element.classList.add(this.daClassname);

      if (place === 'last' || place >= destination.children.length) {
        destination.append(element);
        return;
      }

      if (place === 'first') {
        destination.prepend(element);
        return;
      }

      destination.children[place].before(element);
    } // Функция возврата

  }, {
    key: "moveBack",
    value: function moveBack(parent, element, index) {
      element.classList.remove(this.daClassname);

      if (parent.children[index] !== undefined) {
        parent.children[index].before(element);
      } else {
        parent.append(element);
      }
    } // Функция получения индекса внутри родителя

  }, {
    key: "indexInParent",
    value: function indexInParent(parent, element) {
      return _toConsumableArray(parent.children).indexOf(element);
    } // Функция сортировки массива по breakpoint и place 
    // по возрастанию для this.type = min
    // по убыванию для this.type = max

  }, {
    key: "arraySort",
    value: function arraySort(arr) {
      if (this.type === 'min') {
        arr.sort(function (a, b) {
          if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
              return 0;
            }

            if (a.place === 'first' || b.place === 'last') {
              return -1;
            }

            if (a.place === 'last' || b.place === 'first') {
              return 1;
            }

            return a.place - b.place;
          }

          return a.breakpoint - b.breakpoint;
        });
      } else {
        arr.sort(function (a, b) {
          if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
              return 0;
            }

            if (a.place === 'first' || b.place === 'last') {
              return 1;
            }

            if (a.place === 'last' || b.place === 'first') {
              return -1;
            }

            return b.place - a.place;
          }

          return b.breakpoint - a.breakpoint;
        });
        return;
      }
    }
  }]);

  return DynamicAdapt;
}();

var da = new DynamicAdapt("max");
da.init();
;

(function () {
  var burgerBtnRef = document.querySelector('[data-nav-btn]');
  var mobileMenuRef = document.querySelector('[data-mobile-navigation]');
  var body = document.querySelector('body');
  burgerBtnRef.addEventListener("click", function (event) {
    var expanded = burgerBtnRef.getAttribute("aria-expanded") === "true" || false;
    burgerBtnRef.classList.toggle("is-open");
    burgerBtnRef.setAttribute("aria-expanded", !expanded);
    mobileMenuRef.classList.toggle("is-open");

    if (mobileMenuRef.classList.contains("is-open")) {
      body.style.overflow = 'hidden';
    } else body.style.overflow = "auto";
  });
  mobileMenuRef.addEventListener('click', function (event) {
    if (event.target.classList.contains('nav__mobile-overlay')) {
      mobileMenuRef.classList.remove("is-open");
      body.style.overflow = "auto";
    }
  });
})();

;

(function () {
  var refs = {
    openModalBtn: document.querySelector("[data-open-modal-book]"),
    closeModalBtn: document.querySelector("[data-close-modal-book]"),
    backdrop: document.querySelector("[data-modal-backdrop]")
  };
  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);
  refs.backdrop.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.backdrop.classList.toggle("is-open");

    if (refs.backdrop.classList.contains("is-open")) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  }
})();

;
var btnTop = document.querySelector('[data-top-btn]');
var sentinel = document.querySelector('[data-btn-top-sentinel]');
var hero = document.querySelector('.hero'); // const isVisible = function (target) {
//   // Все позиции элемента
//   var targetPosition = {
//       top: window.pageYOffset + target.getBoundingClientRect().top,
//       left: window.pageXOffset + target.getBoundingClientRect().left,
//       right: window.pageXOffset + target.getBoundingClientRect().right,
//       bottom: window.pageYOffset + target.getBoundingClientRect().bottom
//     },
//     // Получаем позиции окна
//     windowPosition = {
//       top: window.pageYOffset,
//       left: window.pageXOffset,
//       right: window.pageXOffset + document.documentElement.clientWidth,
//       bottom: window.pageYOffset + document.documentElement.clientHeight
//     };
//   if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
//     targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
//     targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
//     targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
//     // Если элемент полностью видно, то запускаем следующий код
//     return;
//   } else {
//     // Если элемент не видно, то запускаем этот код
//     console.dir(window)
//     btn.classList.add('is-visible');
//   };
// };
// // Запускаем функцию при прокрутке страницы
// window.addEventListener('scroll', function() {
//   isVisible(hero);
// });
// // А также запустим функцию сразу. А то вдруг, элемент изначально видно
// isVisible(hero);
// btn.classList.add('is-visible');

btn.addEventListener('click', function (e) {
  return window.scrollTo({
    behavior: "smooth",
    top: top
  });
});
var btn = document.querySelector('[data-hero-btn]');
btn.addEventListener('click', function (e) {
  return window.scrollTo({
    behavior: 'smooth',
    top: document.documentElement.clientHeight
  });
});

function ibg() {
  var ibg = document.querySelectorAll("._ibg");

  for (var i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector('img')) {
      if (document.querySelector('body').classList.contains("no-webp")) {
        if (window.devicePixelRatio === 2) {
          ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('picture img').getAttribute('srcset').split(',')[1].split('.')[0] + ".png";
        } else {
          ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('picture img').getAttribute('src') + ')';
        }
      } else {
        if (window.devicePixelRatio === 2) {
          var path = "" + ibg[i].querySelector('picture source').getAttribute('srcset').split(',')[1].split('.')[0] + ".webp";
          ibg[i].style.backgroundImage = 'url(' + path + ')';
        } else {
          var _path = "" + ibg[i].querySelector('picture img').getAttribute('src').split('.')[0] + ".webp";

          ibg[i].style.backgroundImage = 'url(' + _path + ')';
        }
      }
    }
  }
}

ibg();
;

function testWebP(callback) {
  var webP = new Image();

  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };

  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
});