// Base de datos de propiedades (la misma que definimos anteriormente)
const properties = [
    {
        id: 1,
        name: "AMAPOLAS 30",
        description: "Un gran hogar, con excelentes servicios, ademas de encontrarse en una de las mejores zonas de toda la ciudad",
        image: "Resources/BackgroundComfort.avif",
        features: ["3 habitaciones", "2 baños", "Cocina equipada", "Wifi"],
        location: "Zona Norte"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // Crear el contenedor de sugerencias si no existe
    if (!document.querySelector('.search-suggestions')) {
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'search-suggestions';
        
        // Insertar después de searchbox
        const searchbox = document.querySelector('.searchbox');
        searchbox.parentNode.insertBefore(suggestionsContainer, searchbox.nextSibling);
    }

    const searchInput = document.querySelector('.searchbox input');
    const suggestionsContainer = document.querySelector('.search-suggestions');
    
    // Añadir evento para detectar cambios en el input
    searchInput.addEventListener('input', function() {
        const searchValue = this.value.toLowerCase();
        
        // Limpiar sugerencias anteriores
        suggestionsContainer.innerHTML = '';
        
        // Si el campo está vacío, ocultar sugerencias
        if (searchValue.trim() === '') {
            suggestionsContainer.classList.remove('active');
            return;
        }
        
        // Filtrar propiedades que coincidan con la búsqueda
        const results = properties.filter(property => {
            // Buscar en el nombre de la propiedad
            if (property.name.toLowerCase().includes(searchValue)) {
                return true;
            }
            // Buscar en la descripción
            if (property.description.toLowerCase().includes(searchValue)) {
                return true;
            }
            // Buscar en características
            if (property.features.some(feature => feature.toLowerCase().includes(searchValue))) {
                return true;
            }
            // Buscar por ubicación
            if (property.location.toLowerCase().includes(searchValue)) {
                return true;
            }
            return false;
        });
        
        // Mostrar sugerencias
        if (results.length > 0) {
            results.forEach(property => {
                const suggestion = document.createElement('div');
                suggestion.className = 'suggestion-item';
                suggestion.innerHTML = `
                    <div class="suggestion-image">
                        <img src="${property.image}" alt="${property.name}">
                    </div>
                    <div class="suggestion-content">
                        <h3>${property.name}</h3>
                        <p>${property.location}</p>
                    </div>
                `;
                
                // Añadir evento de clic para ir a la propiedad
                suggestion.addEventListener('click', function() {
                    viewProperty(property.id);
                });
                
                suggestionsContainer.appendChild(suggestion);
            });
            suggestionsContainer.classList.add('active');
        } else {
            // Mostrar mensaje de no resultados
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'No se encontraron resultados';
            suggestionsContainer.appendChild(noResults);
            suggestionsContainer.classList.add('active');
        }
    });
    
    // Cerrar sugerencias al hacer clic fuera
    document.addEventListener('click', function(e) {
        const isSearchbox = e.target.closest('.searchbox');
        const isSuggestions = e.target.closest('.search-suggestions');
        
        if (!isSearchbox && !isSuggestions) {
            suggestionsContainer.classList.remove('active');
        }
    });
    
    // Mantener sugerencias abiertas al hacer clic en la barra de búsqueda
    searchInput.addEventListener('click', function() {
        if (this.value.trim() !== '') {
            suggestionsContainer.classList.add('active');
        }
    });
    
    // Cerrar sugerencias al pulsar Escape
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            suggestionsContainer.classList.remove('active');
        }
    });
});

// Función para ver los detalles de una propiedad específica (igual que antes)
function viewProperty(id) {
    // Buscar la propiedad por su ID
    const property = properties.find(p => p.id === id);
    
    // Aquí puedes implementar la navegación a la página de detalle
    // Por ahora, mostraremos un alerta con los detalles
    alert(`Has seleccionado: ${property.name}\n${property.description}\nUbicación: ${property.location}`);
    
    // En el futuro, puedes redirigir a una página de detalles como:
    // window.location.href = 'detalles.html?id=' + id;
}

// Funciones de búsqueda completa (las que ya teníamos antes)
function searchProperties() {
    const searchValue = document.querySelector('.searchbox input').value.toLowerCase();
    
    if (searchValue.trim() === '') {
        return;
    }
    
    const results = properties.filter(property => {
        if (property.name.toLowerCase().includes(searchValue)) {
            return true;
        }
        if (property.description.toLowerCase().includes(searchValue)) {
            return true;
        }
        if (property.features.some(feature => feature.toLowerCase().includes(searchValue))) {
            return true;
        }
        if (property.location.toLowerCase().includes(searchValue)) {
            return true;
        }
        return false;
    });
    
    displayResults(results);
    
    // Ocultar sugerencias después de buscar
    document.querySelector('.search-suggestions').classList.remove('active');
}

function displayResults(results) {
    const cardContainer = document.querySelector('.card-container');
    const originalTitle = document.querySelector('.homes-title');
    
    cardContainer.innerHTML = '';
    cardContainer.appendChild(originalTitle);
    
    if (results.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = '<p>No se encontraron propiedades que coincidan con tu búsqueda.</p>';
        cardContainer.appendChild(noResults);
        return;
    }
    
    results.forEach(property => {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <img src="${property.image}">
            <div class="card-content">
                <h2>${property.name}</h2>
                <p>${property.description}</p>
                <p class="location">Ubicación: ${property.location}</p>
                <p class="features">Características: ${property.features.join(', ')}</p>
                <a href="#" class="btn" onclick="viewProperty(${property.id})">Conocer más</a>
            </div>
        `;
        
        cardContainer.appendChild(card);
    });
}