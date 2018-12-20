self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('v1').then(function(cache) {
        return cache.addAll([
          'index.html',
          'restaurant.html',
          'sw.js',
          'css/styles.css',
          'js/dbhelper.js',
          'js/main.js',
          'js/restaurant_info.js',
          'data/restaurants.json',
          'img/1.jpg',
          'img/2.jpg',
          'img/3.jpg',
          'img/4.jpg',
          'img/5.jpg',
          'img/6.jpg',
          'img/7.jpg',
          'img/8.jpg',
          'img/9.jpg',
          'img/10.jpg',
          'restaurant.html?id=1',
          'restaurant.html?id=2',
          'restaurant.html?id=3',
          'restaurant.html?id=4',
          'restaurant.html?id=5',
          'restaurant.html?id=6',
          'restaurant.html?id=7',
          'restaurant.html?id=8',
          'restaurant.html?id=9',
          'restaurant.html?id=10'
        ]);
      }).catch(function () {
        console.log('Could not find file to install');
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {

      if (response !== undefined) {
        return response;
      } else {
          return fetch(event.request).then(function (response) {
            return response;
          }).catch(function () {
              console.log('Could not find file ' + event.request.url);
            });
      }
    }));
  });