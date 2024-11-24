// Click Listener Global
window.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', event => {
    let target = event.target;

    // Logica para abrir y cerrar los modales
    if (target.dataset.toggle == "myModal") {
      let modalTargetId = target.dataset.target;
      let modalTargetEl = document.querySelector(modalTargetId);

      if (modalTargetEl) {
        document.body.classList.add("over-y-hide");
        modalTargetEl.classList.add("show");
      }

    }
    if (target.classList.contains("myModal-close") || target.classList.contains("myModal-topClose")) {
      let modalTargetId = target.dataset.close;
      let modalTargetEl = document.querySelector(modalTargetId);

      modalTargetEl.classList.remove("show");
      document.body.classList.remove("over-y-hide");
    }
    if (target.classList.contains("myModal-container")) {
      target.classList.remove("show");
      document.body.classList.remove("over-y-hide");
    }

    // Logica para abrir y cerrar los dropdowns
    if (target.classList.contains('dropdown-link')) {
      if (target.nextElementSibling.classList.contains('dropdown-list')) {
        target.nextElementSibling.classList.toggle('show');
      }
      document.addEventListener('click', (e) => {
        if (!target.contains(e.target)) {
          target.nextElementSibling.classList.remove('show');
        }
      });
    }
    // Logica para abrir y cerrar los dropdowns
    if (target.classList.contains('dropdown-toggle')) {
      if (target.nextElementSibling.classList.contains('dropdown-items')) {
        target.nextElementSibling.classList.toggle('show');
      }
      document.addEventListener('click', (e) => {
        if (!target.contains(e.target)) {
          target.nextElementSibling.classList.remove('show');
        }
      });
    }

    // Logica para abrir y cerrar el sidebar
    if (target.classList.contains('pageSidebar-toggler')) {
      let sidebarContainer = document.querySelector('.pageSidebar-container');
      if (sidebarContainer) {
        sidebarContainer.classList.toggle('visible');
      }
      document.body.classList.toggle('over-y-hide');
    }

    if (target.classList.contains('burgerMenu-toggler') || target.classList.contains('burgerMenu-close')) {
      let burguerMenuContainer = document.querySelector('.burgerMenu-container');
      burguerMenuContainer.classList.toggle('show');
      document.body.classList.toggle('over-y-hide');
    }
    if (target.classList.contains('sidebar-toggler-btn')) {
      let dashboardSidebarContainer = document.querySelector('.dashboard-sidebar-container');
      dashboardSidebarContainer.classList.toggle('show');
    }

    // Logica para abrir y cerrar los enlaces expandidos del menu mobile
    if (target.classList.contains('mobileMenu-link')) {
      let dataExpanded = target.dataset.expand;
      if (dataExpanded) {
        let contentExpanded = document.getElementById(`${dataExpanded}`);
        contentExpanded.classList.toggle('show');

        if (dataExpanded === 'link-search') {
          let searchInput = document.getElementById('search-mobile');
          if (searchInput) {
            searchInput.focus();
          }
        }

        document.addEventListener('click', (e) => {
          if (!target.contains(e.target) && !contentExpanded.contains(e.target)) {
            contentExpanded.classList.remove('show');
          }
        });
      }
    }
    if (target.classList.contains('expandedLink-item-link')) {
      let dataExpanded = target.dataset.expand;
      if (dataExpanded) {
        let contentExpanded = document.getElementById(`${dataExpanded}`);
        contentExpanded.classList.toggle('show');
        target.parentElement.classList.toggle('open');

        document.addEventListener('click', (e) => {
          if (!target.contains(e.target) && !contentExpanded.contains(e.target)) {
            contentExpanded.classList.remove('show');
            target.parentElement.classList.remove('open');
          }
        });
      }
    }

  })


  document.querySelectorAll('[data-toggle="tooltip"]').forEach(function (tooltip) {

    if (tooltip) {
      let tooltipContent;
      tooltip.addEventListener('mouseenter', function () {
        const placement = tooltip.getAttribute('data-placement');
        const width = tooltip.getAttribute('data-width');
        const title = tooltip.getAttribute('data-title');
        tooltipContent = document.createElement('div');
        tooltipContent.className = 'tooltip-content';
        tooltipContent.style.maxWidth = `${width}px`;
        tooltipContent.innerHTML = title;
        tooltipContent.setAttribute('data-placement', placement);
        document.body.appendChild(tooltipContent);

        // Calcular posición
        const rect = tooltip.getBoundingClientRect();
        tooltipContent.style.position = 'absolute';

        // Ajustar posición para evitar desbordamiento
        const tooltipRect = tooltipContent.getBoundingClientRect();
        let top, left;

        switch (placement) {
          case 'top':
            top = rect.top + window.scrollY - tooltipContent.offsetHeight - 10;
            left = rect.left + window.scrollX + (rect.width - tooltipRect.width) / 2;
            break;
          case 'bottom':
            top = rect.bottom + window.scrollY + 10;
            left = rect.left + window.scrollX + (rect.width - tooltipRect.width) / 2;
            break;
          case 'left':
            top = rect.top + window.scrollY + (rect.height - tooltipRect.height) / 2;
            left = rect.left + window.scrollX - tooltipRect.width - 10;
            break;
          case 'right':
            top = rect.top + window.scrollY + (rect.height - tooltipRect.height) / 2;
            left = rect.right + window.scrollX + 10;
            break;
          default:
            top = rect.top + window.scrollY - tooltipContent.offsetHeight - 10;
            left = rect.left + window.scrollX + (rect.width - tooltipRect.width) / 2;
        }

        // Asegurarse de que el tooltip no se desborde
        if (left < 0) left = 10;
        if (left + tooltipRect.width > window.innerWidth) left = window.innerWidth - tooltipRect.width - 10; // Ajustar si se desborda a la derecha

        tooltipContent.style.top = `${top}px`;
        tooltipContent.style.left = `${left}px`;
      });

      tooltip.addEventListener('mouseleave', function () {
        if (tooltipContent) {
          tooltipContent.remove();
          tooltipContent = null;
        }
      });
    }

  });
})


function copyText(target) {
  let dataCopy = target.dataset.copy;
  const contentBtn = target.innerHTML;
  target.innerHTML = "Copied";
  setTimeout(() => {
    target.innerHTML = contentBtn;
  }, 1500);
  const textArea = document.createElement("textarea");

  textArea.style.position = "fixed";
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = "2em";
  textArea.style.height = "2em";
  textArea.style.padding = 0;
  textArea.style.border = "none";
  textArea.style.outline = "none";
  textArea.style.boxShadow = "none";
  textArea.style.background = "transparent";

  textArea.value = dataCopy;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
  } catch (err) {
    console.log("Oops, unable to copy");
  }
  document.body.removeChild(textArea);
}


// Agregar timer custom a las notify default - 5 seg
function createNotify(
  type = "",
  style = "success",
  title = "",
  text = undefined,
  timeout
) {
  if (type != "" && style != "" && title != "") {
    let notifyContainer = document.querySelector(".notify-container");

    notifyElement =
      `
          <div class="notify-wrapper hide ` +
      style +
      `">
              <span class="notify-icon"></span>
              <div class="notify-body">
                  <p class="notify-body_title">` +
      title +
      `</p>
                  <p class="notify-body_text">
                  ` +
      text +
      `
                  </p>
              </div>
              <button class="notify-close"></button>
          </div>
      `;
    tempNotifyElement =
      `
          <div class="temporalNotify-wrapper hide ` +
      style +
      `">
                  <p class="notify-text">
                  ` +
      title +
      `
                  </p>
          </div>
      `;

    if (!notifyContainer) {
      let notifyContainer = document.createElement("div");
      document.body.appendChild(notifyContainer);
      notifyContainer.classList.add("notify-container");

      if (type == "temp") {
        let tempNotifyContainer = document.querySelector(
          ".temporalNotify-container"
        );
        if (tempNotifyContainer) {
          tempNotifyContainer.insertAdjacentHTML(
            "afterbegin",
            tempNotifyElement
          );

          setTimeout(() => {
            tempNotifyContainer.children[0].classList.remove("hide");
          }, 50);
          setTimeout(() => {
            tempNotifyContainer.lastElementChild.classList.add("hide");
            setTimeout(() => {
              tempNotifyContainer.lastElementChild.remove();
            }, 200);
          }, 2000);
        } else {
          let tempNotifyContainer = document.createElement("div");
          notifyContainer.appendChild(tempNotifyContainer);
          tempNotifyContainer.classList.add("temporalNotify-container");
          tempNotifyContainer.insertAdjacentHTML(
            "afterbegin",
            tempNotifyElement
          );
          setTimeout(() => {
            tempNotifyContainer.children[0].classList.remove("hide");
          }, 50);
          setTimeout(() => {
            tempNotifyContainer.lastElementChild.classList.add("hide");
            setTimeout(() => {
              tempNotifyContainer.lastElementChild.remove();
            }, 200);
          }, 2000);
        }
      }

      if (type == "normal") {
        notifyContainer.insertAdjacentHTML("afterbegin", notifyElement);
        setTimeout(() => {
          notifyContainer.children[0].classList.remove("hide");
        }, 100);
        if (timeout) {
          let timeRemove = timeout + 200;
          setTimeout(() => {
            notifyContainer.children[0].classList.add("hide");
          }, timeout);
          setTimeout(() => {
            notifyContainer.children[0].remove();
          }, timeRemove);
        }
      }
    } else {
      if (type == "temp") {
        let tempNotifyContainer = document.querySelector(
          ".temporalNotify-container"
        );
        if (tempNotifyContainer) {
          tempNotifyContainer.insertAdjacentHTML(
            "afterbegin",
            tempNotifyElement
          );

          setTimeout(() => {
            tempNotifyContainer.children[0].classList.remove("hide");
          }, 50);
          setTimeout(() => {
            tempNotifyContainer.lastElementChild.classList.add("hide");
            setTimeout(() => {
              tempNotifyContainer.lastElementChild.remove();
            }, 200);
          }, 2000);
        } else {
          let tempNotifyContainer = document.createElement("div");
          notifyContainer.appendChild(tempNotifyContainer);
          tempNotifyContainer.classList.add("temporalNotify-container");
          tempNotifyContainer.insertAdjacentHTML(
            "afterbegin",
            tempNotifyElement
          );
          setTimeout(() => {
            tempNotifyContainer.children[0].classList.remove("hide");
          }, 50);
          setTimeout(() => {
            tempNotifyContainer.lastElementChild.classList.add("hide");
            setTimeout(() => {
              tempNotifyContainer.lastElementChild.remove();
            }, 200);
          }, 2000);
        }
      }

      if (type == "normal") {
        notifyContainer.insertAdjacentHTML("afterbegin", notifyElement);
        setTimeout(() => {
          notifyContainer.children[0].classList.remove("hide");
        }, 100);
        if (timeout) {
          let timeRemove = timeout + 200;
          setTimeout(() => {
            notifyContainer.children[0].classList.add("hide");
          }, timeout);
          setTimeout(() => {
            notifyContainer.children[0].remove();
          }, timeRemove);
        }
      }
    }
  }
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("notify-close")) {
      e.target.parentElement.classList.add("hide");
      setTimeout(() => {
        e.target.parentElement.remove();
      }, 500);
    }
  });
}

// Script para selector de opciones e insertar opcion en el default option
const selectContainers = document.querySelectorAll(".select-container");
if (selectContainers) {
  for (const selectWrapper of selectContainers) {
    selectWrapper.addEventListener("click", (e) => {
      let targetClick = e.target;
      let input = selectWrapper.querySelector("input");
      let selectDefault = selectWrapper.querySelector('.select-default');

      if (targetClick.contains(selectDefault)) {
        targetClick.nextElementSibling.classList.toggle("show");
      }
      if (targetClick.classList.contains("select-option")) {
        let optionValue = targetClick.value;
        input.value = optionValue;
        let optionName = targetClick.dataset.name;
        let buttonDefault = `
                  <button>
                      <p>${optionName}</p>
                  </button>
              `;
        selectDefault.innerHTML = buttonDefault;
      }
      document.addEventListener("click", (e) => {
        if (!targetClick.contains(e.target)) {
          if (targetClick.nextElementSibling) {
            targetClick.nextElementSibling.classList.remove("show");
          }
        }
      });
    });
  }
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return "";
}

const pageSearchBtn = document.querySelector('.page-count.search')
if (pageSearchBtn) {
  let pageSearch = document.querySelector('.pagination-search')
  pageSearchBtn.addEventListener('click', (e) => {
    let target = e.target

    if (target.classList.contains('page-count')) {
      pageSearch.classList.toggle('show')
    }
  })
  document.addEventListener('click', (e) => {
    if (!pageSearchBtn.contains(e.target)) {
      pageSearch.classList.remove('show');
    }
  });
}

// Funcion para abrir/cerrar el filter dropdown
const dropdownBtn = document.querySelector('.filter-dropdown-btn');
if (dropdownBtn) {
  const dropdownWrapper = document.querySelector('.filter-dropdown-wrapper');
  const cancelBtn = document.querySelector('.filter-dropdown-form button[type="reset"]');

  dropdownBtn.addEventListener('click', function () {
    dropdownWrapper.classList.toggle('show');
  });

  cancelBtn.addEventListener('click', function () {
    dropdownWrapper.classList.remove('show');
  });
}

const tabs = document.querySelectorAll('.tab-navigation input[type="radio"]');
if (tabs) {
  const tabContents = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
    tab.addEventListener('change', () => {
      tabContents.forEach(content => {
        content.classList.remove('active');
      });
      const selectedTab = document.querySelector(`.tab-content[data-tab="${tab.value}"]`);
      if (selectedTab) {
        selectedTab.classList.add('active');
      }
    });
  });
}