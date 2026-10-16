export function formatPrice(price, status = 'sale') {
  if (status === 'rent') {
    return `$${price.toLocaleString()}/mo`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatArea(area) {
  return `${area.toLocaleString()} sq ft`;
}

export function getPropertyTypeLabel(type) {
  const labels = {
    house: 'House',
    apartment: 'Apartment',
    villa: 'Villa',
    cabin: 'Cabin',
  };
  return labels[type] || type;
}

export function getStatusLabel(status) {
  return status === 'sale' ? 'For Sale' : 'For Rent';
}

export function filterProperties(properties, filters) {
  return properties.filter(property => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        property.title.toLowerCase().includes(searchLower) ||
        property.address.toLowerCase().includes(searchLower) ||
        property.type.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    if (filters.type !== 'all' && property.type !== filters.type) {
      return false;
    }

    if (filters.status !== 'all' && property.status !== filters.status) {
      return false;
    }

    if (filters.minPrice && property.price < parseInt(filters.minPrice)) {
      return false;
    }

    if (filters.maxPrice && property.price > parseInt(filters.maxPrice)) {
      return false;
    }

    if (filters.bedrooms !== 'any' && property.bedrooms < parseInt(filters.bedrooms)) {
      return false;
    }

    if (filters.bathrooms !== 'any' && property.bathrooms < parseInt(filters.bathrooms)) {
      return false;
    }

    if (filters.amenities?.length && !filters.amenities.every(amenity =>
      property.features.some(feature => feature.toLowerCase().includes(amenity.toLowerCase()))
    )) {
      return false;
    }

    return true;
  });
}

export function sortProperties(properties, sortBy) {
  const sorted = [...properties];
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'area-desc':
      return sorted.sort((a, b) => b.area - a.area);
    case 'bedrooms-desc':
      return sorted.sort((a, b) => b.bedrooms - a.bedrooms);
    case 'newest':
    default:
      return sorted.sort((a, b) => b.yearBuilt - a.yearBuilt);
  }
}

export function paginateProperties(properties, page, perPage = 9) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return {
    properties: properties.slice(start, end),
    totalPages: Math.ceil(properties.length / perPage),
    total: properties.length,
    startIndex: start + 1,
    endIndex: Math.min(end, properties.length),
  };
}

export const perPageOptions = [
  { value: 6, label: '6 per page' },
  { value: 9, label: '9 per page' },
  { value: 12, label: '12 per page' },
  { value: 24, label: '24 per page' },
];

export function getStatsFromProperties(properties) {
  return {
    total: properties.length,
    forSale: properties.filter(p => p.status === 'sale').length,
    forRent: properties.filter(p => p.status === 'rent').length,
    avgPrice: properties.length > 0
      ? Math.round(properties.reduce((sum, p) => sum + p.price, 0) / properties.length)
      : 0,
  };
}
