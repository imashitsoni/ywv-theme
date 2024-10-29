// BOF Sort Market Countries

var priorityCountries = ['United States', 'Canada', 'Australia', 'United Kingdom'];

var countryList = document.querySelectorAll('#HeaderCountry-country-results .disclosure__item');

var countriesArray = Array.from(countryList);

countriesArray.sort(function(a, b) {
  var countryA = a.querySelector('.country').textContent.trim();
  var countryB = b.querySelector('.country').textContent.trim();

  var indexA = priorityCountries.indexOf(countryA);
  var indexB = priorityCountries.indexOf(countryB);

  if (indexA !== -1 && indexB !== -1) {
    return indexA - indexB;
  }

  if (indexA !== -1) return -1;
  if (indexB !== -1) return 1;

  return countryA.localeCompare(countryB);
});

var ul = document.querySelector('#HeaderCountry-country-results ul');
countriesArray.forEach(function(li) {
  ul.appendChild(li);
});



// Get the <ul> element
var ul = document.querySelector('#HeaderCountry-country-results ul');

// Collect all <li> elements into an array
var lis = Array.from(ul.children);

// Create a Set to track unique content
var seen = new Set();

// Iterate over <li> elements and remove duplicates
lis.forEach(function(li) {
  var country = li.querySelector('.country').textContent.trim();
  
  if (seen.has(country)) {
    ul.removeChild(li);
  } else {
    seen.add(country);
  }
});

// EOF Sort Market Countries