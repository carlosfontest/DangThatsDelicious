function autocomplete(input, latInput, lngInput) {
  if (!input) return;

  const dropdown = new google.maps.places.Autocomplete(input);
  dropdown.addListener('place_changed', () => {
    const place = dropdown.getPlace();
    latInput.value = place.geometry.location.lat();
    lngInput.value = place.geometry.location.lng();
  });
  // If someoner hits enter
  input.on('keydown', (e) => {
    console.log(111);
    if (e.keyCode === 13) {
      console.log(2222);
      e.preventDefault();
    }
  });
}

export default autocomplete;