const searchInput = document.getElementById('search');
const cards = [...document.querySelectorAll('.mod-card')];
const filters = [...document.querySelectorAll('.filter')];
const emptyState = document.getElementById('empty-state');
let activeFilter = 'all';

function applyFilters() {
  const query = (searchInput.value || '').trim().toLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const title = (card.dataset.title || '').toLowerCase();
    const category = (card.dataset.category || '').toLowerCase();
    const matchesQuery = title.includes(query) || card.textContent.toLowerCase().includes(query);
    const matchesFilter = activeFilter === 'all' || category.split(/\s+/).includes(activeFilter);
    const show = matchesQuery && matchesFilter;
    card.hidden = !show;
    if (show) visible++;
  });
  emptyState.hidden = visible !== 0;
}
searchInput.addEventListener('input', applyFilters);
filters.forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  filters.forEach(item => item.classList.toggle('active', item === button));
  applyFilters();
}));
document.getElementById('year').textContent = new Date().getFullYear();
