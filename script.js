document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. SELECT ELEMENTS (Using your NEW IDs) ---
    const filterButton = document.querySelector('.filter-button');
    
    // CHANGED: We look for 'dropdown-content' (your new ID), not 'filterDropdown'
    const filterDropdown = document.getElementById('dropdown-content'); 
    
    const arrow = document.querySelector('.dropdown-arrow');
    const applyFiltersBtn = document.getElementById('applyFiltersBtn');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');

    // --- 2. STATE MEMORY ---
    // This remembers what the user selected, even if they close the menu
    let currentFilters = {
        categories: [], // e.g., ['Social Media', 'Productivity']
        status: []      // e.g., ['Open']
    };

    // --- 3. FILTER BUTTON CLICK (Toggle Logic) ---
    if (filterButton) {
        filterButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents the click from closing the menu immediately

            // Check if we are about to open it (it's currently hidden)
            const isOpening = !filterDropdown.classList.contains('show');
            
            // Toggle the Visuals (Add/Remove Classes)
            filterDropdown.classList.toggle('show'); // Shows/Hides menu
            arrow.classList.toggle('rotated');       // Flips arrow

            // If we are OPENING it, sync the checkboxes with our Memory
            if (isOpening) {
                updateCheckboxesFromState();
            }
        });
    }

    // --- 4. APPLY BUTTON CLICK ---
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', () => {
            // 1. Read the checkboxes and save to Memory
            updateStateFromCheckboxes();
            
            // 2. (Placeholder) Logic to fetch data would go here
            console.log("Filters Applied!", currentFilters);
            
            // 3. Close the menu
            closeDropdown();
        });
    }

    // --- 5. CLEAR BUTTON CLICK ---
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            // 1. Clear the Memory
            currentFilters.categories = [];
            currentFilters.status = [];
            
            // 2. Update the checkboxes visually (uncheck them)
            updateCheckboxesFromState();
            
            // 3. (Placeholder) Logic to fetch data would go here
            console.log("Filters Cleared!");
            
            // 4. Close the menu
            closeDropdown();
        });
    }

    // --- 6. CLICK OUTSIDE TO CLOSE ---
    window.addEventListener('click', (event) => {
        // If the menu is open...
        if (filterDropdown && filterDropdown.classList.contains('show')) {
            // AND the click was NOT inside the dropdown...
            if (!filterDropdown.contains(event.target) && !filterButton.contains(event.target)) {
                closeDropdown();
            }
        }
    });

    // --- HELPER FUNCTIONS ---

    // Helper: Close the menu and reset arrow
    function closeDropdown() {
        filterDropdown.classList.remove('show');
        arrow.classList.remove('rotated');
    }

    // Helper: Look at Memory -> Check/Uncheck HTML boxes
    function updateCheckboxesFromState() {
        const allCheckboxes = document.querySelectorAll('#dropdown-content input[type="checkbox"]');
        
        allCheckboxes.forEach(checkbox => {
            if (checkbox.name === 'category') {
                // Check the box if the value is in our Memory array
                checkbox.checked = currentFilters.categories.includes(checkbox.value);
            } else if (checkbox.name === 'status') {
                checkbox.checked = currentFilters.status.includes(checkbox.value);
            }
        });
    }

    // Helper: Look at HTML boxes -> Save to Memory
    function updateStateFromCheckboxes() {
        // Reset Memory
        currentFilters.categories = [];
        currentFilters.status = [];
        
        // Find only CHECKED boxes
        const checkedCategories = document.querySelectorAll('#dropdown-content input[name="category"]:checked');
        const checkedStatuses = document.querySelectorAll('#dropdown-content input[name="status"]:checked');
        
        // Add their values to Memory
        checkedCategories.forEach(box => currentFilters.categories.push(box.value));
        checkedStatuses.forEach(box => currentFilters.status.push(box.value));
    }

});