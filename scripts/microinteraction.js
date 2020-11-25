window.addEventListener('load', function() {

  const cart = document.querySelector('.cart__icon');
  cart.addEventListener('click', function() {
    const pos = gsap.timeline({  });
    pos.to(cart, { x: -50, duration: .3 });
    pos.to(cart, { x: 300, duration: .6 });
    pos.to(cart, { x: -300, duration: 0 });
    pos.to(cart, { x: 0, duration: .6 });

    const rot = gsap.timeline({  });
    rot.to(cart, { rotation: 20, duration: .3 });
    rot.to(cart, { rotation: -40, duration: .6 });
    rot.to(cart, { rotation: 0, duration: .6 });
    pos.delay(.06);

    // pos.timeScale(.4);
    // rot.timeScale(.4);
  });

});