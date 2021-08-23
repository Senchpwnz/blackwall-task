document.addEventListener('DOMContentLoaded', function() {

  var burger = {
    button: $('#header_burger'),
    menu: $('#header_menu'),
    menuRight: ['50px', '0px'],
    menuOpacity: [0, 1],
    active: false,

    toggleMenu() {
      if ( this.active === true ) {
        this.hideMenu();
      } else {
        this.showMenu();
      }
    },
    showMenu() {
      this.active = true;
      this.menu.css('display', 'flex')
               .stop()
               .animate({
                  right: this.menuRight[1],
                  opacity: this.menuOpacity[1]
               }, 300);
    },
    hideMenu() {
      this.active = false;
      this.menu.stop()
               .animate({
                  right: this.menuRight[0],
                  opacity: this.menuOpacity[0]
               }, 300, function() {
                  burger.menu.css('display', 'none')
                          .attr('style', null);
               });
    },
    
  
  }

  burger.button.on('click', function() {
    burger.toggleMenu()
  });

});