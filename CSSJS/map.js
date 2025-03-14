    // Inicializar el mapa
    var map = L.map('map').setView([25.888104066383267, -97.50024074003767], 25); // Reemplaza con las coordenadas reales
    
    // Añadir capa de mapa base (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Añadir marcador para Amapolas 30
    var marker = L.marker([25.888104066383267, -97.50024074003767]) // Reemplaza con las coordenadas reales
        .addTo(map)
        .bindPopup("<strong>Amapolas 30</strong><br>Un gran hogar en la mejor zona de la ciudad");