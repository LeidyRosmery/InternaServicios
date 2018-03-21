var categories = [
  {
    url: 'obra-gruesa',
    container: 'obra',
    address: 'http://www.sodimac.com.pe/sodimac-pe/content/a1640002/ObraGruesa-Perforacion-Demolicion?cid=ctghoc11990',
    cid: 'ctghoc11990',
    firstSC: 'alisadora'
  },
  {
    url: 'maquinaria',
    container: 'maquinarias',
    address: 'http://www.sodimac.com.pe/sodimac-pe/content/a1660001/Maquinaria-de-carga-Andamios-Escaleras?cid=ctghoc11991',
    cid: 'ctghoc11991',
    firstSC: 'minicargador'
  },
  {
    url: 'contenedores',
    container: 'contenedores',
    address: 'http://www.sodimac.com.pe/sodimac-pe/content/a1650002/Contenedores-Banos?cid=ctghoc11989',
    cid: 'ctghoc11989',
    firstSC: 'banos-quimicos-construccion'
  },
  {
    url: 'electricidad',
    container: 'electricidad',
    address: 'http://www.sodimac.com.pe/sodimac-pe/content/a1660004/Electricidad-Iluminacion?cid=ctghoc11994',
    cid: 'ctghoc11994',
    firstSC: 'extensiones'
  },
  {
    url: 'jardineria',
    container: 'jardineria',
    address: 'http://www.sodimac.com.pe/sodimac-pe/content/a1660003/Jardineria-y-Forestal?cid=ctghoc11993',
    cid: 'ctghoc11993',
    firstSC: 'motosierra'
  },
  {
    url: 'herramientas',
    container: 'herramientas',
    address: 'http://www.sodimac.com.pe/sodimac-pe/content/a1660005/Herramientas-inalambricas?cid=ctghoc11995',
    cid: 'ctghoc11995',
    firstSC: 'atornillador'
  },
  {
    url: 'aseo',
    container: 'aseo',
    address: 'http://www.sodimac.com.pe/sodimac-pe/content/a1660002/Aseo?cid=ctghoc11992',
    cid: 'ctghoc11992',
    firstSC: 'aspiradoras'
  },
  {
    url: 'carpinteria',
    container: 'carpinteria',
    address: 'http://www.sodimac.com.pe/sodimac-pe/content/a1650001/Carpinteria-Construccion-Acabados?cid=ctghoc11988',
    cid: 'ctghoc11988',
    firstSC: 'fresadora'
  }
];

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(document).ready(function() {
  // Get url (without query params), cid param and sc param
  var currentUrl = [location.protocol, '//', location.host, location.pathname].join('');
  var cidCat = getParameterByName('cid', location.href);
  var activeSubCat = getParameterByName('sc', location.href);
  localStorage.setItem("cid", cidCat);
  localStorage.setItem("sc", activeSubCat);
  function checkIfComingFromOtherCategory() {
    // If there is a category and a subcategory, make it active
    if(cidCat !== null && activeSubCat !== null ){
      if (activeSubCat !== "" && typeof subCategoria[activeSubCat] !== undefined) {
        changeActiveSubCategory(activeSubCat);
      }
    }
  }
  // Make subcategory active
  /** @var subCat string
  *   @var $elem jQuery object
  */

  function changeActiveSubCategory(subCat, $elem) {
    $('#title-subcat-responsive').html('+ ' + subCat.toUpperCase());
    if ( subCat === 'banos') {
      $('#title-subcat-responsive').html('+ BAÑOS');
    }
    if ( subCat === 'duchas-y-caseta-de-vigilancia') {
      $('#title-subcat-responsive').html('+ DUCHAS Y CASETA DE VIGILANCIA');
    }
    if ( subCat === 'banos-quimicos-construccion') {
      $('#title-subcat-responsive').html('+ BAÑOS QUÍMICOS CONSTRUCCIÓN');
    }
    if ( subCat === 'banos-quimicos-evento') {
      $('#title-subcat-responsive').html('+ BAÑOS QUÍMICOS EVENTO');
    }
    if ( subCat === 'pistola-drywall') {
      $('#title-subcat-responsive').html('+ PISTOLA DRYWALL');
    }
    if ( subCat === 'soldadora-inversora') {
      $('#title-subcat-responsive').html('+ SOLDADORA INVERSORA');
    }
    if ( subCat === 'limpiadores-tapices') {
      $('#title-subcat-responsive').html('+ LIMPIADORES TAPICES');
    }
    if ( subCat === 'limpiadores-a-vapor') {
      $('#title-subcat-responsive').html('+ LIMPIADORES A VAPOR');
    }
    if ( subCat === 'motoguadanas') {
      $('#title-subcat-responsive').html('+ MOTOGUADAÑAS');
    }

 // Added hiddens sm and xs
    var $linkMenu = $('.hidden-sm.hidden-xs .link-menu[data-subcat="' + activeSubCat + '"]');
    var $clearElement = $linkMenu.parent().parent().find('.active-subCat');
    $clearElement.removeClass('active-subCat');
    $clearElement.parent().prev().find('a').addClass('img-mobile-submenu');
    showProduct(subCategoria[subCat]);
    if (!$elem) {
      $linkMenu.addClass('active-subCat');
      $linkMenu.parent().prev().find('a').removeClass('img-mobile-submenu');
    } else {
      $elem.addClass('active-subCat');
      $elem.parent().prev().find('a').removeClass('img-mobile-submenu');
    }
  }

  $(document).on('click', '.link-menu', function() {
    var $this = $(this),
    clickedUrl = $this.attr('href'),
    clickedSubCat = $this.data('subcat');
    var clickedId = localStorage.getItem('cid');
   
    // If clicked category is the same change active subcategory
    // otherwise go to new cat with subcat url
    if (clickedUrl === currentUrl || clickedUrl === "#") { // # For desktop
      changeActiveSubCategory(clickedSubCat, $this);
      if (clickedUrl !== "#") {
        // Hide all modals on mobile
        var modal = $('div.modal.in').modal('hide');
      }
      history.pushState(null, "", [location.protocol, '//', location.host, location.pathname].join('') + '?cid=' + clickedId + '&sc=' + clickedSubCat);
      
    } else {
      window.location.href = $this.attr('href') + '&sc=' + clickedSubCat;
    }
    return false;
  });

  $(document).on('click', '.link-menu-cat', function() {
      var $this = $(this),
      clickedUrl = $this.attr('href');
      categories.forEach(function (item) {
        (item.address.indexOf(clickedUrl) > -1 ) ? clickedSubCat = item.firstSC : null ; 
      });
      // If clicked category is the same change active subcategory
      // otherwise go to new cat with subcat url
      if (clickedUrl === currentUrl || clickedUrl === "#") { // # For desktop
        if (clickedUrl !== "#") {
          // Hide all modals on mobile
          var modal = $('div.modal.in').modal('hide');
        }
      } else {
        location.href = $this.attr('href') + '&sc=' + clickedSubCat;
      }
      return false;
});

  // insert menu main and get menu for each category
   $( "#menu-tools").load( "/static/categorias/contenidoEstatico/landings/constructor_alquiler_herramientas_2018/menu.html?v=d2spiz22d85fm0j", function() {
       $( ".container-menu-main").load( "/static/categorias/contenidoEstatico/landings/constructor_alquiler_herramientas_2018/frame-menu.html?v=d2spiz22d85fm0j", function() {
          
          categories.forEach(function (item) {
              $( ".container-menu-internal-" + item.container).load( "/static/categorias/contenidoEstatico/landings/constructor_alquiler_herramientas_2018/menu-internal-" + item.url + ".html?v=d2spiz22d85fm0j", function() {
                  var cidCat = localStorage.getItem('cid');
                  var elementSubCat = localStorage.getItem('sc');
                  var $linkMenu = $('.hidden-sm.hidden-xs .link-menu[data-subcat="' + elementSubCat + '"]');
                  if(cidCat !== null && activeSubCat !== null ){
                    if (elementSubCat !== "") {
                        var $clearElement = $linkMenu.parent().parent().find('.active-subCat');
                        $clearElement.removeClass('active-subCat');
                        $clearElement.parent().prev().find('a').addClass('img-mobile-submenu');
                        $linkMenu.addClass('active-subCat');
                        $linkMenu.parent().prev().find('a').removeClass('img-mobile-submenu');
                    } 
                  }
              });
          });

          jQuery('img.svg').each(function() {
          var $img = jQuery(this);
          var imgID = $img.attr('id');
          var imgClass = $img.attr('class');
          var imgURL = $img.attr('src');

          jQuery.get(imgURL, function(data) {
            var $svg = jQuery(data).find('svg');

            if (typeof imgID !== 'undefined') {
              $svg = $svg.attr('id', imgID);
            }
            if (typeof imgClass !== 'undefined') {
              $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            $svg = $svg.removeAttr('xmlns:a');

            if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
              $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            $img.replaceWith($svg);

          }, 'xml');
        }); 
       });
  });
  checkIfComingFromOtherCategory();
});
